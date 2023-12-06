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
        $coupon = Coupon::where('code', $request->input('code'))->first();

        $response = [
            'status' => 'success',
            'data' => [
                'coupon' => $coupon
            ], 
        ];

        return response()->json($response);
    }
}