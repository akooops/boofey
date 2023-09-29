<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use Illuminate\Http\Request;
use App\Http\Requests\Billings\StoreBillingRequest;
use App\Http\Requests\Billings\UpdateBillingRequest;
use App\Models\AcademicYear;
use App\Models\Father;
use App\Models\File;
use App\Models\School;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class BillingsController extends Controller
{
    /**
     * Display all billings
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        $search = $request->query('search');

        $billingsQuery = Billing::latest()->where([
            'father_id' => $father->id
        ]);

        $billings = $billingsQuery->get();


        $response = [
            'status' => 'success',
            'data' => [
                'billings' => $billings,
            ],
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created billing
     * 
     * @param Billing $billing
     * @param StoreBillingRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBillingRequest $request) 
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        $billing = Billing::create(array_merge(
            $request->validated(),
            [
                'father_id' => $father->id,
            ]
        ));

        $billing->save();

        return response()->json([
            'status' => 'success',
            'data' => [
                'billing' => $billing
            ]
        ]);
    }

    /**
     * Show billing data
     * 
     * @param Billing $billing
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Billing $billing) 
    {        
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($billing->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'billing' => $billing
            ]
        ]);
    }

    /**
     * Update billing data
     * 
     * @param Billing $billing
     * @param UpdateBillingRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Billing $billing, UpdateBillingRequest $request) 
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($billing->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        $billing->update(array_merge(
            $request->validated(),
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete billing data
     * 
     * @param Billing $billing
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Billing $billing) 
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father == null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($billing->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }
        
        $billing->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}