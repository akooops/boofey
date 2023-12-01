<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests\Permissions\StorePermissionRequest;
use App\Http\Requests\Permissions\UpdatePermissionRequest;
use Spatie\Permission\Models\Permission;

class PermissionsController extends Controller
{
    /**
     * Display all permissions
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $permissions = Permission::orderBy('id', 'DESC');

        if ($search) {
            $permissions
            ->where('id', $search)
            ->orWhere('name', 'like', '%' . $search . '%');
        }

        $permissions = $permissions->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $permissions->items(), 
            'pagination' => handlePagination($permissions)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created permission
     * 
     * @param Permission $permission
     * @param StorePermissionRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Permission $permission, StorePermissionRequest $request) 
    {
        $permission->create(array_merge(
            $request->validated(),
            ['guard_name' => 'web']
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show permission data
     * 
     * @param Permission $permission
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'permission' => $permission
            ]
        ]);
    }

    /**
     * Update permission data
     * 
     * @param Permission $permission
     * @param UpdatePermissionRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Permission $permission, UpdatePermissionRequest $request) 
    {
        $permission->update(array_merge(
            $request->validated(),
            ['guard_name' => 'web']
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete permission data
     * 
     * @param Permission $permission
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission) 
    {
        $permission->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}