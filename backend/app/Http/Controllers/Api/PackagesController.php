<?php

namespace App\Http\Controllers\Api;

use App\Models\Package;
use Illuminate\Http\Request;
use App\Http\Requests\Packages\StorePackageRequest;
use App\Http\Requests\Packages\UpdatePackageRequest;
use App\Models\File;
use App\Models\School;

class PackagesController extends Controller
{
    /**
     * Display all packages
     * 
     * @return \Illuminate\Http\Response
     */
    public function index($id, Request $request) 
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

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = $request->query('page', 1);
        $search = $request->query('search');

        if ($page === null || strtolower($page) === 'null') {
            $page = 1;
        }
        
        $packages = Package::latest()->where([
            'school_id' => $school->id
        ])->with([
            'school:id,name', 
            'packageFeatures'
        ]);

        if ($search) {
            $packages->where('name', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        }

        $packages = $packages->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $packages->items(), 
            'pagination' => [
                'per_page' => $packages->perPage(),
                'current_page' => $packages->currentPage(),
                'last_page' => $packages->lastPage(),
                'from' => $packages->firstItem(),
                'to' => $packages->lastItem(),
                'total' => $packages->total(),
                'pages' => pages($packages->currentPage(), $packages->lastPage())
            ],
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created package
     * 
     * @param Package $package
     * @param StorePackageRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store($id, StorePackageRequest $request) 
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

        if ($request->get('yearly') == true) {
            $currentAcademicYear = $school->currentAcademicYear;
            if ($currentAcademicYear) {
                $request->merge(['days' => $currentAcademicYear->academicDays]);
            }
        }

        $package = Package::create(array_merge(
            $request->all(),
            ['school_id' => $school->id]
        ));

        $package->save();

        $package->storePackagesFeatures($request->get('features'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show package data
     * 
     * @param Package $package
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $package = Package::with(['school:id,name', 'packageFeatures'])->find($id);

        if (!$package) {
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
                'package' => $package
            ]
        ]);
    }

    /**
     * Update package data
     * 
     * @param Package $package
     * @param UpdatePackageRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdatePackageRequest $request) 
    {
        $package = Package::find($id);
        
        if (!$package) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        if ($request->get('yearly') == true) {
            $school = $package->school;

            if ($school) {
                $currentAcademicYear = $school->currentAcademicYear;

                if ($currentAcademicYear) {
                    $request->merge(['days' => $currentAcademicYear->academicDays]);
                }
            }
        }

        $package->update(array_merge($request->all()));

        $package->updatePackagesFeatures($request->get('features'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete package data
     * 
     * @param Package $package
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $package = Package::find($id);

        if (!$package) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $package->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}