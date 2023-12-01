<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests\Roles\StoreRoleRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;
use Spatie\Permission\Models\Permission;
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
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $roles = Role::orderBy('id', 'DESC')->with('permissions:id,name,guard_name');

        if ($search) {
            $roles->where(function ($query) use ($search) {
                $query
                    ->where('id', $search)
                    ->orWhere('name', 'like', '%' . $search . '%');
            })
            ->orWhereHas('permissions', function ($permissionQuery) use ($search) {
                $permissionQuery->where('name', 'like', '%' . $search . '%');
            });
        }

        $roles = $roles->paginate($perPage, ['*'], 'page', $page);
        $permissions = Permission::orderBy('id', 'DESC')->select('id', 'name', 'guard_name')->get();

        $response = [
            'status' => 'success',
            'data' => [
                'roles' => $roles->items(),
                'permissions' => $permissions
            ], 
            'pagination' => handlePagination($roles)
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
        $role->create(['name' => $request->get('name'), 'guard_name' => 'web']);

        $permissions = $request->get('permissions');

        if(is_string($permissions) && json_decode($permissions) !== null) {
            $permissions = json_decode($permissions, true);
        }

        $role->syncPermissions($permissions, true);

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
    public function show(Role $role) 
    {
        $role->with('permissions:id,name,guard_name');
        
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
    public function update(Role $role, UpdateRoleRequest $request) 
    {
        $role->update([
            'name' => $request->input('name'),
            'guard_name' => 'web'
        ]);
        
        $permissions = $request->get('permissions');

        if(is_string($permissions) && json_decode($permissions) !== null) {
            $permissions = json_decode($permissions, true);
        }

        $role->syncPermissions($permissions, true);
        
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
    public function destroy(Role $role) 
    {
        $role->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}