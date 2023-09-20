<?php

namespace App\Http\Controllers\Admin;

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

    public function store(StoreAcademicYearRequest $request) 
    {
        $schoolId = $request->get('school_id');
        $school = School::findOrFail($schoolId);

        $this->createAcademicYear($request, $school);
    
        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Store a newly created academicYear
     * 
     * @param AcademicYear $academicYear
     * @param StoreAcademicYearRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function storeBySchool(School $school, StoreAcademicYearRequest $request) 
    {
        $this->createAcademicYear($request, $school);

        return response()->json([
            'status' => 'success'
        ]);
    }

    private function createAcademicYear($request, School $school = null) 
    {
        $current = null;

        if($request->input('current') == true) {
            AcademicYear::where('school_id', $school->id)->update(['current' => false]);
        }

        if($school->currentAcademicYear == null){
            $current = true;
        }

        $academicYear = AcademicYear::create(array_merge(
            $request->validated(),
            [
                'school_id' => $school->id,
                'current' => ($current == null) ? $request->input('current') : $current
            ]
        ));

        $academicYear->save();

        if ($request->input('current') == true && $school) {
            $school->updateYearlyPackages();
        }
    }

    /**
     * Show academicYear data
     * 
     * @param AcademicYear $academicYear
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(AcademicYear $academicYear) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'academicYear' => $academicYear
            ]
        ]);
    }

    /**
     * Update academicYear data
     * 
     * @param AcademicYear $academicYear
     * @param UpdateAcademicYearRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(AcademicYear $academicYear, UpdateAcademicYearRequest $request) 
    {
        $current = null;

        if($request->input('current') == true) {
            AcademicYear::where('school_id', $academicYear->school_id)->update(['current' => false]);
        }

        if($request->input('current') == false && $academicYear->current == true) {
            $current = true;
        }

        $academicYear->update(array_merge(
            $request->validated(),
            [
                'current' => ($current == null) ? $request->input('current') : $current
            ]
        ));

        $academicYear->school->updateYearlyPackages();

        return response()->json([
            'status' => 'success'
        ]);
    }



    /**
     * Delete academicYear data
     * 
     * @param AcademicYear $academicYear
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademicYear $academicYear) 
    {
        if($academicYear->current == true) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'current' => 'Unable to delete the current year!'
                ]
            ]);
        }
        
        $academicYear->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}