<?php

namespace App\Http\Controllers\Admin;

use App\Models\Canteen;
use Illuminate\Http\Request;
use App\Http\Requests\CanteenUsers\StoreCanteenUserRequest;
use App\Models\CanteenUser;
use App\Models\File;
use App\Models\Payment;
use App\Models\School;
use App\Models\User;

class PaymentsController extends Controller
{
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $payments = Payment::latest()->with([
            'coupon:id,name,code,discount',
            'package:id,name,name_ar,code,sale_price,price,days,tax,popular,school_id',
            'package.school:id,name,name_ar,file_id',
            'package.school.logo:id,path,current_name',
            'billing:id,firstname,lastname,email,phone,address,country,state,zipcode',
            'paymentMethod:id,card_number,card_holder_name',
            'father:id,user_id',
            'father.user:id,username,email,phone', 
            'father.user.profile:id,user_id,firstname,lastname,file_id',
            'father.user.profile.image', 
            'student:id,firstname,lastname,file_id',
            'student.image:id,path,current_name'
        ]);

        /*
        if ($search) {
            $payments->where('name', 'like', '%' . $search . '%');
        }
        */

        $payments = $payments->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $payments->makeHidden(['student.current_subscription']), 
            'pagination' => handlePagination($payments)
        ];

        return response()->json($response);
    }

    public function show(Payment $payment) 
    {
        $payment->load([
            'coupon:id,name,code,discount',
            'package:id,name,name_ar,code,sale_price,price,days,tax,popular,school_id',
            'package.school:id,name,name_ar,file_id',
            'package.school.logo:id,path,current_name',
            'billing:id,firstname,lastname,email,phone,address,country,state,zipcode',
            'paymentMethod:id,card_number,card_holder_name',
            'father:id,user_id',
            'father.user:id,username,email,phone', 
            'father.user.profile:id,user_id,firstname,lastname,file_id',
            'father.user.profile.image', 
            'student:id,firstname,lastname,file_id',
            'student.image:id,path,current_name'
        ]);

        return response()->json([
            'status' => 'success',
            'data' => [
                'payment' => $payment
            ]
        ]);

        return response()->json($payment);
    }

    /**
     * Delete canteen data
     * 
     * @param Canteen $canteen
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payment $payment) 
    {
        $payment->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}