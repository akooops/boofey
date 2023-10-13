<?php

namespace App\Http\Controllers\Admin;

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
        $search = checkIfSearchEmpty($request->query('search'));

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
        $coupon = Coupon::create(array_merge($request->validated()));

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
    public function show(Coupon $coupon) 
    {
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
    public function update(Coupon $coupon, UpdateCouponRequest $request) 
    {
        $coupon->update($request->validated());

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
    public function destroy(Coupon $coupon) 
    {
        $coupon->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}