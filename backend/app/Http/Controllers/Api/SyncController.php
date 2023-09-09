<?php

namespace App\Http\Controllers\Api;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\File;
use App\Models\School;

class SyncController extends Controller
{
    /**
     * Display all academicYears
     * 
     * @return \Illuminate\Http\Response
     */
    public function students(Request $request) 
    {
        $canteen = $request->get('canteen');
        $students = $canteen->school->students;
    }
}