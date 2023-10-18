<?php

namespace App\Http\Controllers\Admin;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\Canteen;
use App\Models\File;
use App\Models\Queue;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Carbon\Carbon;

class DashboardsController extends Controller
{
    public function subscribersCount(Request $request){
        $subscribersCount = Subscription::where('status', 'active')->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'subscribersCount' => $subscribersCount
            ]
        ]);
    }

    public function lastSubscribedStudents(Request $request){
        $students = Student::select('students.id', 'students.firstname', 'students.lastname', 'school_id')
            ->join('subscriptions', 'students.id', '=', 'subscriptions.student_id')
            ->whereIn('subscriptions.status', ['active', 'inactive'])
            ->whereNotIn('subscriptions.status', ['expired', 'initiated', 'disabled'])
            ->orderBy('subscriptions.started_at')
            ->limit(20)
            ->get();

        $response = [
            'status' => 'success',
            'data' => $students, 
        ];

        return response()->json($response);
    }

    public function expiringSoonStudents(Request $request){
        $students = Student::select('students.id', 'students.firstname', 'students.lastname', 'school_id')
            ->join('subscriptions', 'students.id', '=', 'subscriptions.student_id')
            ->where('subscriptions.status', 'active')
            ->whereNotIn('subscriptions.status', ['inactive', 'expired', 'initiated', 'disabled'])
            ->orderBy('subscriptions.balance')
            ->limit(20)
            ->get();

        $response = [
            'status' => 'success',
            'data' => $students, 
        ];

        return response()->json($response);
    }

    public function doneByCanteens(Request $request)
    {
        // Get the date range from the request (e.g., 'yesterday', 'last7days', 'last28days', or 'custom')
        $range = $request->input('range', 'last7days');
        
        // Get the custom date range if 'custom' is selected
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        
        if ($endDate) {
            $endDate = Carbon::parse($endDate)->endOfDay();
        }

        if ($range === 'custom' && (empty($startDate) || empty($endDate))) {
            $startDate = Carbon::now()->subDays(7)->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        }

        // Retrieve all canteens with queue student counts for the specified date range
        $canteens = Canteen::with(['queues.students' => function ($query) use ($range, $startDate, $endDate) {
            if ($range === 'yesterday') {
                $query->whereDate('started_at', Carbon::yesterday());
            } elseif ($range === 'last7days') {
                $query->where('started_at', '>=', Carbon::now()->subDays(7));
            } elseif ($range === 'last28days') {
                $query->where('started_at', '>=', Carbon::now()->subDays(28));
            } elseif ($range === 'custom' && $startDate && $endDate) {
                $query->whereBetween('started_at', [$startDate, $endDate]);
            }
        }])->get();

        // Calculate the counts for each canteen
        $result = $canteens->map(function ($canteen) {
            $count = $canteen->queues->flatMap(function ($queue) {
                return $queue->students;
            })->count();

            return [
                'data' => $canteen->makeHidden(['queues']),
                'count' => $count,
            ];
        });

        return response()->json($result);
    }

    public function avgByCanteens(Request $request)
    {
        // Get the date range from the request (e.g., 'yesterday', 'last7days', 'last28days', or 'custom')
        $range = $request->input('range');
        
        // Get the custom date range if 'custom' is selected
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        
        // Adjust the end date to 00:00:00 of the next day
        if ($endDate) {
            $endDate = Carbon::parse($endDate)->endOfDay();
        }
        
        // Check if the range is 'custom' and both start and end dates are missing
        if ($range === 'custom' && empty($startDate) && empty($endDate)) {
            $startDate = Carbon::now()->subDays(7)->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        }
        
        // Retrieve all canteens with queue student data for the specified date range
        $canteens = Canteen::with(['queues.students' => function ($query) use ($range, $startDate, $endDate) {
            if ($range === 'yesterday') {
                $query->whereDate('started_at', Carbon::yesterday());
            } elseif ($range === 'last7days') {
                $query->where('started_at', '>=', Carbon::now()->subDays(7));
            } elseif ($range === 'last28days') {
                $query->where('started_at', '>=', Carbon::now()->subDays(28));
            } elseif ($range === 'custom' && $startDate && $endDate) {
                $query->whereBetween('started_at', [$startDate, $endDate]);
            }
        }])->get();

        // Calculate the average time between 'started_at' and 'exited_at' for each canteen
        $result = $canteens->map(function ($canteen) {
            $queueStudents = $canteen->queues->flatMap(function ($queue) {
                return $queue->queueStudents()->whereNot('exited_at', NULL)->get();
            });


            $averageTime = $queueStudents->avg(function ($student) {
                return optional($student->exited_at)->diffInMinutes($student->started_at) ?? 0;
            });

            return [
                'data' => $canteen->makeHidden(['queues']),
                'average_time' => ($averageTime == null) ? 0 : $averageTime,
            ];
        });

        return response()->json($result);
    }
}
