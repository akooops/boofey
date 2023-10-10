<?php

namespace App\Http\Controllers\Admin;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Requests\AcademicYears\StoreAcademicYearRequest;
use App\Http\Requests\AcademicYears\UpdateAcademicYearRequest;
use App\Models\File;
use App\Models\School;
use App\Models\Subscription;

class DashboardsController extends Controller
{
    public function subscribersCount(Request $request){
        $subscribersCount = Subscription::where('balance', '>', 0)
                ->where('started_at', '!=', NULL)
                ->count();

        return response()->json([
            'status' => 'success',
            'data' => [
                'subscribersCount' => $subscribersCount
            ]
        ]);
    }

    public function getExpiringSoonStudents(Request $request){
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        
        $response = [
            'status' => 'success',
            'data' => $coupons->items(), 
            'pagination' => handlePagination($coupons)
        ];

        return response()->json($response);
    }
}