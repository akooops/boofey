<?php

namespace App\Http\Controllers\Admin;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Http\Requests\Reports\RevenuesRequest;
use App\Models\Canteen;
use App\Models\Division;
use App\Models\Father;
use App\Models\File;
use App\Models\Order;
use App\Models\Queue;
use App\Models\School;
use App\Models\Student;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReportsController extends Controller
{
    public function todaySubscribers(School $school, Request $request)
    {
        $school->load('logo');

        $level = $request->input('level', null);
        $grade = $request->input('grade', null); 

        $divisionId = $request->input('division', null);
        $division = null;

        if(is_null($divisionId) == false){
            $division = $school->Divisions()->where('id', $divisionId)->first();

            if (!$division) {
                return response()->json([
                    'status' => 'error',
                    'errors' => [
                        'division' => ['Invalid division ID for the specified school.']
                    ],
                ], 422);
            }    
        }

        $students = $school->students()
            ->whereHas('activeSubscription')
            ->with(['image', 'activeSubscription', 'activeSubscription.package', 'division:id,name']);

        if($level && $grade){
            $students->where('class', $grade);
        }else{
            if (is_null($level) == false && $level == 0) {
                $students->where('class', '>=', 0)->where('class', '<', 6);
            }else if($level == 1){
                $students->where('class', '>=', 6)->where('class', '<', 9);
            }else if($level == 2){
                $students->where('class', '>=', 9)->where('class', '<', 12);
            }
    
            if ($grade) {
                $students->where('class', $grade);
            }
        }

        $students = $students->get();

        $today = Carbon::now();
        $formattedDate = $today->format("M jS, Y");

        if ($divisionId) {
            $students = $students->where('division_id', $divisionId);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'date' =>$formattedDate,
                'count' => count($students),
                'school' => $school->makeHidden(['currentAcademicYear']),
                'students' => $students->makeHidden(['activeSubscription']),
                'division' => $division
            ]
        ]);
    }

    public function subsriptionStatus(Request $request)
    {
        $level = $request->input('level', null);
        $grade = $request->input('grade', null); 
        $school = $request->input('school', null); 

        $students = Student::with([
            'school:id,name,file_id',
            'school.logo:id,path,current_name'
        ])->whereHas('activeSubscription')->with(['image', 'activeSubscription.package']);

        if($school){
            $school = School::find($school);

            if($school){
                $school->load('logo');

                $students->where('school_id', $school->id);
            }
        }

        if($level && $grade){
            $students->where('class', $grade);
        }else{
            if (is_null($level) == false && $level == 0) {
                $students = $students->where('class', '>=', 0)->where('class', '<', 6);
            }else if($level == 1){
                $students = $students->where('class', '>=', 6)->where('class', '<', 9);
            }else if($level == 2){
                $students = $students->where('class', '>=', 9)->where('class', '<', 12);
            }
    
            if ($grade) {
                $students->where('class', $grade);
            }
        }

        $students = $students->orderBy('school_id')->get();

        $today = Carbon::now();
        $formattedDate = $today->format("M jS, Y");

        return response()->json([
            'status' => 'success',
            'data' => [
                'date' =>$formattedDate,
                'count' => count($students),
                'school' => (is_null($school)) ? null : $school->makeHidden(['currentAcademicYear']),
                'students' => $students,
            ]
        ]);
    }

    public function revenues(RevenuesRequest $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
    
        $startDate = Carbon::parse($startDate);
        $endDate = Carbon::parse($endDate)->endOfDay();

        $subscriptions = Subscription::where('exclude_from_calculation', false)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->with([
                'student:id,firstname,lastname,file_id',
                'student.image:id,current_name,path',
                'package:id,name,school_id',
                'package.school:id,name,file_id',
                'package.school.logo:id,path,current_name'
            ])
            ->get();

        $subtotalSum = 0;
        $discountSum = 0;
        $taxSum = 0;
        $totalSum = 0;

        foreach ($subscriptions as $subscription) {  
            $subtotalSum += $subscription->subtotal;
            $discountSum += $subscription->discountCalculated;
            $taxSum += $subscription->taxCalculated;
            $totalSum += $subscription->total;
        }

    
        $response = [
            'status' => 'success',
            'data' => [
                'count' => count($subscriptions),
                'subtotalSum' => number_format($subtotalSum, 2),
                'discountSum' => number_format($discountSum, 2),
                'taxSum' => number_format($taxSum, 2),
                'totalSum' => number_format($totalSum, 3),
                'subscriptions' => $subscriptions
            ],
        ];
    
        return response()->json($response);
    }
}

