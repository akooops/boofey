<?php

namespace App\Http\Controllers\Api;

use App\Models\School;
use Illuminate\Http\Request;
use App\Http\Requests\Schools\StoreSchoolRequest;
use App\Http\Requests\Schools\UpdateSchoolRequest;
use App\Models\File;

class SchoolsController extends Controller
{
    /**
     * Display all schools
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = $request->query('page', 1);
        $search = $request->query('search');

        if ($page === null || strtolower($page) === 'null') {
            $page = 1;
        }

        $schools = School::latest()->with([
            'logo:id,path,current_name', 
        ]);

        if ($search) {
            $schools->where('name', 'like', '%' . $search . '%');
        }

        $schools = $schools->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $schools->items(), 
            'pagination' => [
                'per_page' => $schools->perPage(),
                'current_page' => $schools->currentPage(),
                'last_page' => $schools->lastPage(),
                'from' => $schools->firstItem(),
                'to' => $schools->lastItem(),
                'total' => $schools->total(),
                'pages' => pages($schools->currentPage(), $schools->lastPage())
            ],
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created school
     * 
     * @param School $school
     * @param StoreSchoolRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSchoolRequest $request) 
    {
        $file = uploadFile($request->file('file'), 'schools');

        $school = School::create(array_merge(
            $request->validated(),
            ['file_id' => $file->id]
        ));

        $school->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show school data
     * 
     * @param School $school
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $school = School::with('logo:id,path,current_name')->find($id);

        if (!$school) {
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
                'school' => $school
            ]
        ]);
    }

    /**
     * Update school data
     * 
     * @param School $school
     * @param UpdateSchoolRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateSchoolRequest $request) 
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

        $file = File::find($school->file_id);

        if($request->file('file')) {
            removeFile($file);

            $file = uploadFile($request->file('file'), 'schools');
        }

        $school->update(array_merge(
            $request->validated(),
            ['file_id' => $file->id]
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete school data
     * 
     * @param School $school
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
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

        $file = File::find($school->file_id);

        $school->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }
}