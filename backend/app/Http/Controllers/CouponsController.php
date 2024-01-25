<?php

namespace App\Http\Controllers;

use App\Http\Requests\Coupons\CheckCouponRequest;
use App\Models\Coupon;

class CouponsController extends Controller
{
    /**
     * Display all coupons
     * 
     * @return \Illuminate\Http\Response
     */
    public function check(CheckCouponRequest $request) 
    {
        $uppercasedCode = strtoupper($request->input('code'));

        $coupon = Coupon::where('code', $uppercasedCode)->first();
    
        $response = [
            'status' => 'success',
            'data' => [
                'coupon' => $coupon
            ], 
        ];

        return response()->json($response);
    }
}