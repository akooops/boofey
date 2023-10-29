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
        $father = $request->get('father');

        $search = checkIfSearchEmpty($request->query('search'));

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
        $father = $request->get('father');

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
    public function show(Billing $billing, Request $request) 
    {        
        $father = $request->get('father');

        if($billing->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
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
        $father = $request->get('father');

        if($billing->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
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
    public function destroy(Billing $billing, Request $request) 
    {
        $father = $request->get('father');

        if($billing->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }
        
        $billing->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}