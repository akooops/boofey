<?php

namespace App\Http\Controllers\Api;

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
        $search = $request->query('search');

        $permissions = Permission::latest();

        if ($search) {
            $permissions->where('name', 'like', '%' . $search . '%')
            ->orWhere('guard_name', 'like', '%' . $search . '%');
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
        $permission->create(array_merge($request->validated()));

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
    public function show($id) 
    {
        $permission = Permission::find($id);

        if (!$permission) {
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
    public function update($id, UpdatePermissionRequest $request) 
    {
        $permission = Permission::find($id);

        if (!$permission) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $permission->update($request->validated());

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
    public function destroy($id) 
    {
        $permission = Permission::find($id);

        if (!$permission) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $permission->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}