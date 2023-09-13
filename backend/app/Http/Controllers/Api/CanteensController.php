<?php

namespace App\Http\Controllers\Api;

use App\Models\Canteen;
use Illuminate\Http\Request;
use App\Http\Requests\Canteens\StoreCanteenRequest;
use App\Http\Requests\Canteens\UpdateCanteenRequest;
use App\Models\File;
use App\Models\School;

class CanteensController extends Controller
{
    /**
     * Display all canteens
     * 
     * @return \Illuminate\Http\Response
     */
    public function index($id, Request $request) 
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

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $canteens = Canteen::latest()->where([
            'school_id' => $school->id
        ]);

        if ($search) {
            $canteens->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%');
            })
            ->orWhereHas('school', function ($schoolQuery) use ($search) {
                $schoolQuery->where('name', 'like', '%' . $search . '%');
            });
        }

        $canteens = $canteens->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'packages' => $canteens->items(), 
                'school' => $school
            ],
            'pagination' => handlePagination($canteens)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created canteen
     * 
     * @param Canteen $canteen
     * @param StoreCanteenRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store($id, StoreCanteenRequest $request) 
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

        $canteen = Canteen::create(array_merge(
            $request->validated(),
            ['school_id' => $school->id]
        ));

        $canteen->save();
        $canteen->generateApiKey();

        return response()->json([
            'status' => 'success',
            'data' => [
                'api_key' => $canteen->getDecryptedKey()
            ]
        ]);
    }

    /**
     * Show canteen data
     * 
     * @param Canteen $canteen
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $canteen = Canteen::with([
            'school:id,name,file_id', 
            'school.logo:id,path,current_name', 
        ])->find($id);

        if (!$canteen) {
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
                'canteen' => $canteen
            ]
        ]);
    }

    /**
     * Update canteen data
     * 
     * @param Canteen $canteen
     * @param UpdateCanteenRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateCanteenRequest $request) 
    {
        $canteen = Canteen::find($id);
        
        if (!$canteen) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $canteen->update(array_merge($request->validated()));

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function generate($id) 
    {
        $canteen = Canteen::find($id);
        
        if (!$canteen) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $canteen->generateApiKey();

        return response()->json([
            'status' => 'success',
            'data' => [
                'api_key' => $canteen->getDecryptedKey()
            ]
        ]);
    }

    public function revoke($id) 
    {
        $canteen = Canteen::find($id);
        
        if (!$canteen) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $canteen->revokeApiKey();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete canteen data
     * 
     * @param Canteen $canteen
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $canteen = Canteen::find($id);

        if (!$canteen) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $canteen->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}