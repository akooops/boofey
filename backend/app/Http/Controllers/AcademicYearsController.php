<?php

namespace App\Http\Controllers;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\File;
use App\Models\School;

class AcademicYearsController extends Controller
{
    /**
     * Display all packages
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('school')) {
            $schoolId = $request->query('school');
            $school = School::findOrFail($schoolId);
    
            return $this->indexBySchool($school, $request);
        }

        $academicYears = $this->getAcademicYearsQuery($request);

        $response = [
            'status' => 'success',
            'data' => [
                'academicYears' => $academicYears->makeHidden(['academicBreaks']),
            ],
            'pagination' => handlePagination($academicYears),
        ];

        return response()->json($response);
    }

    public function indexBySchool(School $school, Request $request)
    {
        $school->load([
            'logo:id,current_name,path'
        ]);

        $academicYears = $this->getAcademicYearsQuery($request, $school);

        $response = [
            'status' => 'success',
            'data' => [
                'academicYears' => $academicYears->makeHidden(['academicBreaks']),
                'school' => $school->makeHidden(['created_at', 'updated_at']),
            ],
            'pagination' => handlePagination($academicYears),
        ];

        return response()->json($response);
    }

    private function getAcademicYearsQuery(Request $request, School $school = null)
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $academicYearsQuery = AcademicYear::latest();

        if ($school) {
            $academicYearsQuery->where('school_id', $school->id);
        }else{
            $academicYearsQuery->with([
                'school:id,name,file_id',
                'school.logo:id,current_name,path'
            ]); 
        }

        if ($search) {
            $academicYearsQuery->where('name', 'like', '%' . $search . '%');
        }

        return $academicYearsQuery->paginate($perPage, ['*'], 'page', $page);
    }
}