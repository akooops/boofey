<?php

namespace App\Http\Controllers\Api;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\File;
use App\Models\School;

class AcademicYearsController extends Controller
{
    /**
     * Display all academicYears
     * 
     * @return \Illuminate\Http\Response
     */
    public function index($id, Request $request) 
    {
        $school = School::find($id);

        if (!$school) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $academicYears = AcademicYear::latest()->where([
            'school_id' => $school->id
        ])->with('academicBreaks:id,academic_year_id,name,from,to');

        $academicYears = $academicYears->newQuery()->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $academicYears->items(), 
            'pagination' => handlePagination($academicYears)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created academicYear
     * 
     * @param AcademicYear $academicYear
     * @param StoreAcademicYearRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store($id, StoreAcademicYearRequest $request) 
    {
        $school = School::find($id);

        if (!$school) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        if($request->input('current') == true) {
            AcademicYear::where('school_id', $school->id)->update(['current' => false]);

        }

        $academicYear = AcademicYear::create(array_merge(
            $request->validated(),
            ['school_id' => $school->id]
        ));

        $academicYear->save();

        if($request->input('current') == true) {
            $academicYear->school->updateYearlyPackages();
        }

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show academicYear data
     * 
     * @param AcademicYear $academicYear
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $academicYear = AcademicYear::with(['school:id,name', 'academicBreaks'])->find($id);

        if (!$academicYear) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }
        
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
    public function update($id, UpdateAcademicYearRequest $request) 
    {
        $academicYear = AcademicYear::find($id);
        
        if (!$academicYear) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        if($request->input('current') == true) {
            AcademicYear::where('school_id', $academicYear->school_id)->update(['current' => false]);
        }

        $academicYear->update(array_merge($request->validated()));
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
    public function destroy($id) 
    {
        $academicYear = AcademicYear::find($id);

        if (!$academicYear) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $academicYear->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}