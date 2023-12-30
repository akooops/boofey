<?php

namespace App\Http\Controllers\Admin;

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
    public function index(Request $request)
    {
        if ($request->has('school')) {
            $schoolId = $request->query('school');
            $school = School::findOrFail($schoolId);
    
            return $this->indexBySchool($school, $request);
        }

        $packages = $this->getPackagesQuery($request);

        $response = [
            'status' => 'success',
            'data' => [
                'packages' => $packages->items(),
            ],
            'pagination' => handlePagination($packages),
        ];

        return response()->json($response);
    }

    public function indexBySchool(School $school, Request $request)
    {
        $school->load([
            'logo:id,current_name,path'
        ]);

        $packages = $this->getPackagesQuery($request, $school);

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

    private function getPackagesQuery(Request $request, School $school = null)
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $yearly = $request->query('yearly', null);
        $popular = $request->query('popular', null);
        $hidden = $request->query('hidden', null);

        $packagesQuery = Package::orderBy('id', 'DESC')->with([
            'packageFeatures:id,name,name_ar,checked,package_id',
        ]);

        if ($school) {
            $packagesQuery->where('school_id', $school->id);
        }else{
            $packagesQuery->with([
                'school:id,name,file_id',
                'school.logo:id,current_name,path'
            ]); 
        }

        if ($search) {
            $packagesQuery->where(function ($query) use ($search) {
                $query
                    ->where('id', $search)
                    ->orWhere('name', 'like', '%' . $search . '%')
                    ->orWhere('name_ar', 'like', '%' . $search . '%')
                    ->orWhere('code', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%')
                    ->orWhere('description_ar', 'like', '%' . $search . '%');
            });
        }

        if(!is_null($yearly)){
            $packagesQuery->where('yearly', $yearly);
        }

        if(!is_null($popular)){
            $packagesQuery->where('popular', $popular);
        }

        if(!is_null($hidden)){
            $packagesQuery->where('hidden', $hidden);
        }
        
        return $packagesQuery->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * Store a newly created package
     * 
     * @param Package $package
     * @param StorePackageRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StorePackageRequest $request) 
    {
        $schoolId = $request->get('school_id');
        $school = School::findOrFail($schoolId);

        $this->createPackage($request, $school);
    
        return response()->json([
            'status' => 'success'
        ]);
    }

        /**
     * Store a newly created academicYear
     * 
     * @param AcademicYear $academicYear
     * @param StoreAcademicYearRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function storeBySchool(School $school, StorePackageRequest $request) 
    {
        $this->createPackage($request, $school);

        return response()->json([
            'status' => 'success'
        ]);
    }

    private function createPackage($request, School $school = null) 
    {
        $days = null;

        if ($request->get('yearly') == true) {
            if ($school && $school->currentAcademicYear) 
                $days = $school->currentAcademicYear->academicDays;
        }

        $package = Package::create(array_merge(
            $request->validated(),
            [
                'should_start_at' => $request->get('should_start_later') == true ? $request->get('should_start_at') : null,
                'school_id' => $school->id,
                'days' => ($days === null) ? $request->input('days') : $days
            ]
        ));

        $package->save();

        $package->storePackagesFeatures($request->get('features'));
    }

    /**
     * Show package data
     * 
     * @param Package $package
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Package $package) 
    {    
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
    public function update(Package $package, UpdatePackageRequest $request) 
    {
        $days = null;

        if ($request->get('yearly') == true) {
            $school = $package->school;

            if ($school && $school->currentAcademicYear) 
                $days = $school->currentAcademicYear->academicDays;
        }

        $package->update(array_merge(
            $request->validated(),
            [
                'should_start_at' => $request->get('should_start_later') == true ? $request->get('should_start_at') : null,
                'sale_price' => ($request->has('sale_price') || $request->input('sale_price') != null) ? $request->input('sale_price') : null,
                'tax' => ($request->has('tax') || $request->input('tax') != null) ? $request->input('tax') : 0,
                'days' => ($days === null) ? $request->input('days') : $days
            ]
        ));

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
    public function destroy(Package $package) 
    {
        $package->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}