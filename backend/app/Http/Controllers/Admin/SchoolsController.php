<?php

namespace App\Http\Controllers\Admin;

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
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $schools = School::orderBy('id', 'DESC')->with([
            'logo:id,path,current_name', 
        ]);

        if ($search) {
            $schools->where('name', 'like', '%' . $search . '%');
        }

        $schools = $schools->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $schools->items(), 
            'pagination' => handlePagination($schools)
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
        $school->createDefaulAcademicYear();

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
    public function show(School $school) 
    {
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
    public function update(School $school, UpdateSchoolRequest $request) 
    {
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
    public function destroy(School $school) 
    {
        $file = File::find($school->file_id);

        $school->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }
}