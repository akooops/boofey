<?php

namespace App\Http\Controllers\Api;

use App\Models\Father;
use Illuminate\Http\Request;
use App\Http\Requests\Fathers\StoreFatherRequest;
use App\Http\Requests\Fathers\UpdateFatherRequest;
use App\Models\User;

class FathersController extends Controller
{
    /**
     * Display all fathers
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $fathers = Father::latest()->with([
            'user:id,username', 
            'user.profile:id,user_id,firstname,lastname,file_id',
            'user.profile.image',
            'user.roles:id,name,guard_name', 
        ]);

        if ($search) {
            $fathers->where(function ($query) use ($search) {
                $query->whereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('username', 'like', '%' . $search . '%')
                            ->orWhere('email', 'like', '%' . $search . '%')
                            ->orWhere('phone', 'like', '%' . $search . '%')
                            ->orWhereHas('profile', function ($profileQuery) use ($search) {
                                $profileQuery->where('firstname', 'like', '%' . $search . '%')
                                    ->orWhere('lastname', 'like', '%' . $search . '%');
                            });
                    });
            });
        }

        $fathers = $fathers->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'fathers' => $fathers->items(), 
            ],
            'pagination' => handlePagination($fathers)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created father
     * 
     * @param Father $father
     * @param StoreFatherRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreFatherRequest $request) 
    {
        $father = Father::create(array_merge($request->validated()));
        $father->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show father data
     * 
     * @param Father $father
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $father = Father::with([
            'user:id,username', 
            'user.profile:id,user_id,firstname,lastname,file_id',
            'user.profile.image',
            'user.roles:id,name,guard_name', 
        ])->find($id);

        if (!$father) {
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
                'father' => $father
            ]
        ]);
    }

    /**
     * Update father data
     * 
     * @param Father $father
     * @param UpdateFatherRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateFatherRequest $request) 
    {
        $father = Father::find($id);
        
        if (!$father) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $father->update($request->validated());

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete father data
     * 
     * @param Father $father
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $father = Father::find($id);

        if (!$father) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $father->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}