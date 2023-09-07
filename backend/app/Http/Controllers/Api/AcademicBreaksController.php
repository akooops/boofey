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
    public function index($id, Request $request) 
    {
        $academicYear = AcademicYear::with(['school:id,name,file_id', 'school.logo:id,path,current_name'])->find($id);
        if (!$academicYear) {
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
    public function store($id, StoreAcademicBreakRequest $request) 
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
    public function show($id) 
    {
        $academicBreak = AcademicBreak::find($id);

        if (!$academicBreak) {
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
    public function update($id, UpdateAcademicBreakRequest $request) 
    {
        $academicBreak = AcademicBreak::find($id);
        
        if (!$academicBreak) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

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
    public function destroy($id) 
    {
        $academicBreak = AcademicBreak::find($id);

        if (!$academicBreak) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $academicBreak->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}