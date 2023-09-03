<?php

namespace App\Http\Controllers\Api;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\File;

class AcademicYearsController extends Controller
{
    /**
     * Display all academicYears
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = $request->query('page', 1);
        $search = $request->query('search');

        $academicYears = AcademicYear::latest()->with([
            'logo:id,path,current_name', 
        ]);

        if ($search) {
            $academicYears->where('name', 'like', '%' . $search . '%');
        }

        $academicYears = $academicYears->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $academicYears->items(), 
            'pagination' => [
                'per_page' => $academicYears->perPage(),
                'current_page' => $academicYears->currentPage(),
                'last_page' => $academicYears->lastPage(),
                'from' => $academicYears->firstItem(),
                'to' => $academicYears->lastItem(),
                'total' => $academicYears->total(),
                'pages' => pages($academicYears->currentPage(), $academicYears->lastPage())
            ],
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
    public function store(StoreAcademicYearRequest $request) 
    {
        $file = uploadFile($request->file('file'), 'academicYears');

        $academicYear = AcademicYear::create(array_merge(
            $request->validated(),
            ['file_id' => $file->id]
        ));

        $academicYear->save();

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
        $academicYear = AcademicYear::with('logo:id,path,current_name')->find($id);

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

        $file = File::find($academicYear->file_id);

        if($request->file('file')) {
            removeFile($file);

            $file = uploadFile($request->file('file'), 'academicYears');
        }

        $academicYear->update(array_merge(
            $request->validated(),
            ['file_id' => $file->id]
        ));

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

        $file = File::find($academicYear->file_id);

        $academicYear->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }
}