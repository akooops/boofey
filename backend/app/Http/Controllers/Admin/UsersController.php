<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    /**
     * Display all users
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $users = User::latest()->with([
            'profile:id,user_id,firstname,lastname,file_id',
            'profile.image:id,current_name,path',
            'roles:id,name,guard_name', 
        ]);

        if ($search) {
            $users->where(function ($query) use ($search) {
                $query->where('username', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            })
            ->orWhereHas('roles', function ($rolesQuery) use ($search) {
                $rolesQuery->where('name', 'like', '%' . $search . '%')
                    ->orWhere('guard_name', 'like', '%' . $search . '%')
                    ->orWhereHas('permissions', function ($permissionsQuery) use ($search) {
                        $permissionsQuery->where('name', 'like', '%' . $search . '%')
                            ->orWhere('guard_name', 'like', '%' . $search . '%');
                    });
            })
            ->orWhereHas('profile', function ($profileQuery) use ($search) {
                $profileQuery->where('firstname', 'like', '%' . $search . '%')
                    ->orWhere('lastname', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $users = $users->paginate($perPage, ['*'], 'page', $page);
        $roles = Role::select('id', 'name', 'guard_name')->get();

        $response = [
            'status' => 'success',
            'data' => [
                'users' => $users->items(), 
                'roles' => $roles
            ],
            'pagination' => handlePagination($users)
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
    public function store(StoreUserRequest $request) 
    {
        $user = User::create(array_merge($request->validated()));
        $user->save();

        $user->syncRoles($request->get('role_id'));

        $user->profile()->create(array_merge($request->validated()));

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

        $user->profile()->update([
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
        ]);

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