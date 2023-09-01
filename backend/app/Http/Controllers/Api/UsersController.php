<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;

class UsersController extends Controller
{
    /**
     * Display all users
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = $request->query('perPage', 10); 
        $page = $request->query('page', 1);

        $users = User::latest()->with([
            'roles:id,name,guard_name', 
            'roles.permissions:id,name,guard_name'
        ])->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $users->items(), 
            'pagination' => [
                'per_page' => $users->perPage(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'from' => $users->firstItem(),
                'to' => $users->lastItem(),
                'total' => $users->total(),
            ],
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created user
     * 
     * @param User $user
     * @param StoreUserRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(User $user, StoreUserRequest $request) 
    {
        $user->create(array_merge($request->validated()));
        $user->syncRoles($request->get('role_id'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show user data
     * 
     * @param User $user
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $user = User::with(['roles:id,name,guard_name', 'roles.permissions:id,name,guard_name'])->find($id);

        if (!$user) {
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
                'user' => $user
            ]
        ]);
    }

    /**
     * Update user data
     * 
     * @param User $user
     * @param UpdateUserRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateUserRequest $request) 
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $user->update($request->validated());

        $user->syncRoles($request->get('role_id'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete user data
     * 
     * @param User $user
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}