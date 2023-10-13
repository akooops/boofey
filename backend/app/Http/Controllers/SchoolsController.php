<?php

namespace App\Http\Controllers;

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
            'pagination' => handlePagination($schools)
        ];

        return response()->json($response);
    }
}