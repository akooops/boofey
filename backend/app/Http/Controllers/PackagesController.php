<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use App\Http\Requests\Packages\StorePackageRequest;
use App\Http\Requests\Packages\UpdatePackageRequest;
use App\Models\File;
use App\Models\School;

class PackagesController extends Controller
{
    public function indexBySchool(School $school, Request $request)
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $school->load([
            'logo:id,current_name,path'
        ]);

        $packagesQuery = Package::latest()->with([
            'packageFeatures:id,name,checked,package_id',
        ]);

        $packagesQuery->where([
            'school_id' => $school->id,
            'hidden' => false
        ]);

        if ($search) {
            $packagesQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('code', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $packages = $packagesQuery->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'packages' => $packages->items(),
                'school' => $school->makeHidden(['created_at', 'updated_at']),
            ],
            'pagination' => handlePagination($packages),
        ];

        return response()->json($response);
    }
}