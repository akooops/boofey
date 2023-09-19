<?php

namespace App\Http\Controllers\Api;

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
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $academicBreaks = AcademicBreak::latest()->where([
            'academic_year_id' => $academicYear->id
        ]);

        $academicBreaks = $academicBreaks->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'academicBreaks' => $academicBreaks->items(), 
                'academicYear' => $academicYear,
            ],
            'pagination' => handlePagination($academicBreaks)
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