<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\Roles\StoreRoleRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    /**
     * Display all roles
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = $request->query('page', 1);
        $search = $request->query('search');

        $roles = Role::latest()->with('permissions:id,name,guard_name');

        if ($search) {
            $roles->where('name', 'like', '%' . $search . '%');
        }

        $roles = $roles->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $roles->items(), 
            'pagination' => [
                'per_page' => $roles->perPage(),
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'from' => $roles->firstItem(),
                'to' => $roles->lastItem(),
                'total' => $roles->total(),
                'pages' => pages($roles->currentPage(), $roles->lastPage())
            ],
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created role
     * 
     * @param Role $role
     * @param StoreRoleRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Role $role, StoreRoleRequest $request) 
    {
        $role = Role::create(['name' => $request->get('name')]);
        $role->syncPermissions($request->get('permissions'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show role data
     * 
     * @param Role $role
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $role = Role::with('permissions:id,name,guard_name')->find($id);

        if (!$role) {
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
                'role' => $role
            ]
        ]);
    }

    /**
     * Update role data
     * 
     * @param Role $role
     * @param UpdateRoleRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateRoleRequest $request) 
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $role->update($request->only('name'));
        $role->syncPermissions($request->get('permissions'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete role data
     * 
     * @param Role $role
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $role->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}