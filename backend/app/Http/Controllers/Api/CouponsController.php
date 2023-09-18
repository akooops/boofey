<?php

namespace App\Http\Controllers\Api;

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
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $expired = $request->query('expired', true);

        $coupons = Coupon::latest();

        if ($search) {
            $coupons->where('name', 'like', '%' . $search . '%')
            ->orWhere('code', 'like', '%' . $search . '%');
        }

        if($expired == false)
            $coupons->whereRaw('(used < max AND onhold = false)');

        $coupons = $coupons->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $coupons->items(), 
            'pagination' => handlePagination($coupons)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created coupon
     * 
     * @param Coupon $coupon
     * @param StoreCouponRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCouponRequest $request) 
    {
        $coupon = Coupon::create(array_merge($request->all()));

        $coupon->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show coupon data
     * 
     * @param Coupon $coupon
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
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
                'coupon' => $coupon
            ]
        ]);
    }

    /**
     * Update coupon data
     * 
     * @param Coupon $coupon
     * @param UpdateCouponRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update($id, UpdateCouponRequest $request) 
    {
        $coupon = Coupon::find($id);
        
        if (!$coupon) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $coupon->update(array_merge($request->all()));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete coupon data
     * 
     * @param Coupon $coupon
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $coupon->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}