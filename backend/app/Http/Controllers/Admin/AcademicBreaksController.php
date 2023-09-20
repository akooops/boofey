<?php

namespace App\Http\Controllers\Admin;

use App\Models\AcademicBreak;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicBreaks\StoreAcademicBreakRequest;
use App\Http\Requests\AcademicBreaks\UpdateAcademicBreakRequest;
use App\Models\File;
use App\Models\AcademicYear;

class AcademicBreaksController extends Controller
{
    /**
     * Display all academicBreaks
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(AcademicYear $academicYear, Request $request) 
    {
        $academicYear->load([
            'school:id,name,file_id',
            'school.logo:id,current_name,path'
        ]);

        $academicBreaks = AcademicBreak::latest()->where([
            'academic_year_id' => $academicYear->id
        ]);

        $response = [
            'status' => 'success',
            'data' => [
                'academicBreaks' => $academicBreaks->get(), 
                'academicYear' => $academicYear->makeHidden(['academicBreaks', 'created_at', 'updated_at']),
            ],
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created academicBreak
     * 
     * @param AcademicBreak $academicBreak
     * @param StoreAcademicBreakRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(AcademicYear $academicYear, StoreAcademicBreakRequest $request) 
    {
        $academicBreak = AcademicBreak::create(array_merge(
            $request->validated(),
            ['academic_year_id' => $academicYear->id]
        ));

        $academicBreak->save();

        $academicBreak->academicYear->school->updateYearlyPackages();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show academicBreak data
     * 
     * @param AcademicBreak $academicBreak
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(AcademicBreak $academicBreak) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'academicBreak' => $academicBreak
            ]
        ]);
    }

    /**
     * Update academicBreak data
     * 
     * @param AcademicBreak $academicBreak
     * @param UpdateAcademicBreakRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(AcademicBreak $academicBreak, UpdateAcademicBreakRequest $request) 
    {
        $academicBreak->update(array_merge($request->validated()));
        $academicBreak->academicYear->school->updateYearlyPackages();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete academicBreak data
     * 
     * @param AcademicBreak $academicBreak
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademicBreak $academicBreak) 
    {
        $academicBreak->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}