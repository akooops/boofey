<?php

namespace App\Http\Controllers\Admin;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\Canteen;
use App\Models\Father;
use App\Models\File;
use App\Models\Order;
use App\Models\Queue;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardsController extends Controller
{
    public function count(Request $request){
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if (empty($startDate) || empty($endDate)) {
            $startDate = now()->subDays(7)->format('Y-m-d');
            $endDate = now()->format('Y-m-d');

            $previousEndDate = Carbon::parse($startDate)->subDay()->format('Y-m-d');
            $previousStartDate = Carbon::parse($previousEndDate)->subDays(7)->format('Y-m-d');
        }else{
            $dateDiff = Carbon::parse($startDate)->diffInDays(Carbon::parse($endDate));
            $previousStartDate = Carbon::parse($startDate)->subDays($dateDiff)->format('Y-m-d');
            $previousEndDate = Carbon::parse($startDate)->subDay()->format('Y-m-d');
        }

        $subscribersCount = $this->subscribersCount($startDate, $endDate);
        $previousSubscribersCount = $this->subscribersCount($previousStartDate, $previousEndDate);
        $subscribersCountDiff = $this->calulcateDiff($subscribersCount, $previousSubscribersCount);

        $studentsCount = $this->studentsCount($startDate, $endDate);
        $previousstudentsCountCount = $this->studentsCount($previousStartDate, $previousEndDate);
        $studentsCountsCountDiff = $this->calulcateDiff($studentsCount, $previousstudentsCountCount);

        $fathersCount = $this->fathersCount($startDate, $endDate);
        $previousFathersCount = $this->fathersCount($previousStartDate, $previousEndDate);
        $fathersCountDiff = $this->calulcateDiff($fathersCount, $previousFathersCount);

        $subscriptionsTotal = $this->subscriptionsTotal($startDate, $endDate);
        $previousSubscriptionsTotal = $this->subscriptionsTotal($previousStartDate, $previousEndDate);
        $subscriptionsTotalDiff = $this->calulcateDiff($subscriptionsTotal, $previousSubscriptionsTotal);

        $ordersTotal = $this->ordersTotal($startDate, $endDate);
        $previousOrdersTotal = $this->ordersTotal($previousStartDate, $previousEndDate);
        $ordersTotalDiff = $this->calulcateDiff($ordersTotal, $previousOrdersTotal);

        return response()->json([
            'status' => 'success',
            'data' => [
                'subscribersCount' => [
                    'value' => $subscribersCount,
                    'percentageDiff' => $subscribersCountDiff['percentageDiff'],
                    'increase' => $subscribersCountDiff['increase'],
                ],
                'studentsCount' => [
                    'value' => $studentsCount,
                    'percentageDiff' => $studentsCountsCountDiff['percentageDiff'],
                    'increase' => $studentsCountsCountDiff['increase'],
                ],
                'fathersCount' => [
                    'value' => $fathersCount,
                    'percentageDiff' => $fathersCountDiff['percentageDiff'],
                    'increase' => $fathersCountDiff['increase'],
                ],
                'subscriptionsTotal' => [
                    'value' => $subscriptionsTotal,
                    'percentageDiff' => $subscriptionsTotalDiff['percentageDiff'],
                    'increase' => $subscriptionsTotalDiff['increase'],
                ],
                'ordersTotal' => [
                    'value' => $ordersTotal,
                    'percentageDiff' => $ordersTotalDiff['percentageDiff'],
                    'increase' => $ordersTotalDiff['increase'],
                ],
            ]
        ]);
    }

    private function calulcateDiff($current, $prev){
        if ($prev === 0) {
            return [
                'percentageDiff' => ($current > 0) ? 100 : 0,
                'increase' => ($current > 0) ? 'increase' : 'neutral'
            ];
        }
    
        $percentageDiff = (($current - $prev) / $prev) * 100;
        $percentageDiff = number_format($percentageDiff, 2);

        return [
            'percentageDiff' => $percentageDiff,
            'increase' => ($percentageDiff > 0) ? 'increase' : (($percentageDiff < 0) ? 'decrease' : 'neutral')
        ];
    }

    private function subscribersCount($startDate, $endDate){
        $subscribersCount = Subscription::where('status', 'active')
        ->whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->count();

        return $subscribersCount;
    }

    private function studentsCount($startDate, $endDate){
        $studentsCount = Student::whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->count();

        return $studentsCount;
    }

    private function fathersCount($startDate, $endDate){
        $fathersCount = Father::whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->count();

        return $fathersCount;
    }

    private function subscriptionsTotal($startDate, $endDate){
        $subscriptionsTotal = Subscription::whereNot('exclude_from_calculation', true)
        ->whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->sum('total');

        return $subscriptionsTotal;
    }

    private function ordersTotal($startDate, $endDate){
        $ordersTotal = Order::whereDate('created_at', '>=', $startDate)
        ->whereDate('created_at', '<=', $endDate)
        ->sum('total');

        return $ordersTotal;
    }

    public function lastSubscribedStudents(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));

        $students = Student::select('students.id', 'students.firstname', 'students.lastname', 'school_id')
            ->join('subscriptions', 'students.id', '=', 'subscriptions.student_id')
            ->whereIn('subscriptions.status', ['active', 'inactive'])
            ->whereNotIn('subscriptions.status', ['expired', 'initiated', 'disabled'])
            ->orderBy('subscriptions.started_at');

        $students = $students->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $students->items(), 
            'pagination' => handlePagination($students),
        ];

        return response()->json($response);
    }

    public function expiringSoonStudents(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));

        $students = Student::select('students.id', 'students.firstname', 'students.lastname', 'school_id')
            ->join('subscriptions', 'students.id', '=', 'subscriptions.student_id')
            ->where('subscriptions.status', 'active')
            ->whereNotIn('subscriptions.status', ['inactive', 'expired', 'initiated', 'disabled'])
            ->orderBy('subscriptions.balance');

        $students = $students->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $students->items(), 
            'pagination' => handlePagination($students),
        ];
            
        return response()->json($response);
    }

    public function absentStudents(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        
        $today = Carbon::today();

        $absentStudents = Student::whereDoesntHave('queues', function ($query) use ($today) {
            $query->whereDate('queues.started_at', $today);
        });

        $absentStudents = $absentStudents->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $absentStudents->items(), 
            'pagination' => handlePagination($absentStudents),
        ];

        return response()->json($response);
    }

    public function canteensStatus(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));

        $canteens = Canteen::with([
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]); 

        $canteens = $canteens->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $canteens->items(), 
            'pagination' => handlePagination($canteens),
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
                'canteen' => $canteen->makeHidden(['queues']),
                'count' => $count,
            ];
        });

        $response = [
            'status' => 'success',
            'data' => $result->toArray()
        ];

        return response()->json($response);
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

        $response = [
            'status' => 'success',
            'data' => $result->toArray()
        ];

        return response()->json($response);
    }

    public function dailyTotal(Request $request)
    {
        $range = $request->input('range', 'last7days');
    
        // Get the custom date range if 'custom' is selected
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        
        if ($range === 'custom' && (empty($startDate) || empty($endDate))) {
            $startDate = Carbon::now()->subDays(7)->startOfDay();
            $endDate = Carbon::now()->endOfDay();
        }else{
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
        }

        if ($range !== 'custom' && empty($startDate) && empty($endDate)) {
            if ($range === 'yesterday') {
                $startDate = Carbon::yesterday()->startOfDay();
                $endDate = Carbon::yesterday()->endOfDay();
            } elseif ($range === 'last7days') {
                $startDate = Carbon::now()->subDays(7)->startOfDay();
                $endDate = Carbon::now()->endOfDay();
            } elseif ($range === 'last28days') {
                $startDate = Carbon::now()->subDays(28)->startOfDay();
                $endDate = Carbon::now()->endOfDay();
            }
        } 
        
        // Adjust the end date to 00:00:00 of the next day
        if ($endDate) {
            $endDate = Carbon::parse($endDate)->endOfDay();
        }

        
        $dailyTotals = [];
        $currentDate = $startDate;

        while ($currentDate->lte($endDate)) {
            $subscriptions = Subscription::where('exclude_from_calculation', false)
                ->whereDate('created_at', $currentDate->format('Y-m-d'));
            
            // Calculate the total for the current day
            $total = $subscriptions->sum('total');
            
            $dailyTotals[] = [
                'day' => $currentDate->format('d M'),
                'total' => $total,
            ];
            
            $currentDate->addDay();
        }

        $response = [
            'status' => 'success',
            'data' => $dailyTotals,
        ];

        return response()->json($response);
    }

}

