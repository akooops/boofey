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
        $level = $request->input('level', null);
        $grade = $request->input('grade', null); 

        $students = $school->students()
            ->whereHas('activeSubscription')
            ->with(['image', 'activeSubscription.package']);

        if($level && $grade){
            $students->where('class', $grade);
        }else{
            if ($level == 0) {
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

        return response()->json([
            'status' => 'success',
            'data' => [
                'students' => $students
            ]
        ]);
    }
}

