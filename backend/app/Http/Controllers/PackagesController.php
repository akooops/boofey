<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use App\Http\Requests\Packages\StorePackageRequest;
use App\Http\Requests\Packages\UpdatePackageRequest;
use App\Models\File;
use App\Models\School;
use App\Models\Student;

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

        $packages = Package::latest()->where([
            'school_id' => $school->id,
            'hidden' => false,
            'yearly' => 0
        ])->with([
            'packageFeatures:id,name,checked,package_id',
        ])->get();

        $yearlyPackages = Package::latest()->where([
            'school_id' => $school->id,
            'hidden' => false,
            'yearly' => 1
        ])->with([
            'packageFeatures:id,name,checked,package_id',
        ])->get();

        $response = [
            'status' => 'success',
            'data' => [
                'packages' => $packages,
                'yearlyPackages' => $yearlyPackages,
                'school' => $school->makeHidden(['created_at', 'updated_at']),
            ],
        ];

        return response()->json($response);
    }
}