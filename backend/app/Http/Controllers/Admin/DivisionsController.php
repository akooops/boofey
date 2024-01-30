<?php

namespace App\Http\Controllers\Admin;

use App\Models\Division;
use Illuminate\Http\Request;
use App\Http\Requests\Divisions\StoreCouponRequest;
use App\Http\Requests\Divisions\StoreDivisionRequest;
use App\Http\Requests\Divisions\UpdateCouponRequest;
use App\Http\Requests\Divisions\UpdateDivisionRequest;
use App\Models\File;
use App\Models\School;

class DivisionsController extends Controller
{
    /**
     * Display all divisions
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $divisions = Division::orderBy('id', 'DESC');

        if ($search) {
            $divisions
            ->where('id', $search)
            ->where('name', 'like', '%' . $search . '%')
            ->orWhere('name_ar', 'like', '%' . $search . '%');
        }

        $divisions = $divisions->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $divisions->items(), 
            'pagination' => handlePagination($divisions)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created division
     * 
     * @param Division $division
     * @param StoreCouponRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(School $school, StoreDivisionRequest $request) 
    {
        $division = Division::create(array_merge(
            $request->validated(),
            [
                'school_id' => $school->id
            ]
        ));

        $division->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show division data
     * 
     * @param Division $division
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Division $division) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'division' => $division
            ]
        ]);
    }

    /**
     * Update division data
     * 
     * @param Division $division
     * @param UpdateCouponRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Division $division, UpdateDivisionRequest $request) 
    {
        $division->update(array_merge(
            $request->validated()
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete division data
     * 
     * @param Division $division
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Division $division) 
    {
        $division->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}