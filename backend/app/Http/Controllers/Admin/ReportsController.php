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

class ReportsController extends Controller
{
    public function todaySubscribers(School $school, Request $request)
    {
        $school->load('logo');

        $level = $request->input('level', null);
        $grade = $request->input('grade', null); 

        $students = $school->students()
            ->whereHas('activeSubscription')
            ->with(['image', 'activeSubscription.package']);

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

        return response()->json([
            'status' => 'success',
            'data' => [
                'date' =>$formattedDate,
                'count' => count($students),
                'school' => $school->makeHidden(['currentAcademicYear']),
                'students' => $students,
            ]
        ]);
    }

    public function subsriptionStatus(Request $request)
    {
        $level = $request->input('level', null);
        $grade = $request->input('grade', null); 
        $school = $request->input('school', null); 

        $students = Student::whereHas('activeSubscription')->with(['image', 'activeSubscription.package']);

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

        $students = $students->get();

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
}

