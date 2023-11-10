<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Requests\Coupons\StoreCouponRequest;
use App\Http\Requests\Coupons\UpdateCouponRequest;
use App\Models\File;

class CouponsController extends Controller
{
    /**
     * Display all coupons
     * 
     * @return \Illuminate\Http\Response
     */
    public function check($code = null) 
    {
        $coupon = Coupon::where('code', $code)->whereRaw('(used < max AND onhold = false)')->first();

        if($coupon === null){
            return response()->json([
                'status' => 'error',
                'error' => __('translations.invalid_coupon')
            ], 200);
        }

        $response = [
            'status' => 'success',
            'data' => [
                'coupon' => $coupon
            ], 
        ];

        return response()->json($response);
    }
}