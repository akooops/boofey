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
            'subscription:id,ref,package_id,student_id,started_at,expired_at,initiated_at,days',
            'subscription.package:id,name,code,sale_price,price,days,school_id',
            'subscription.package.school:id,name,file_id',
            'subscription.package.school.logo:id,path,current_name',
            'father:id,user_id',
            'father.user:id,username,email,phone', 
            'father.user.profile:id,user_id,firstname,lastname,file_id',
            'father.user.profile.image', 
            'subscription.student:id,firstname,lastname,file_id',
            'subscription.student.image:id,path,current_name',
            'subscription.payment:id,subscription_id,status,payment_option,card_number,card_holder_name,firstname,lastname,email,phone,address,state,city,zipcode'
        ]);

        if ($search) {
            $payments->where(function ($query) use ($search) {
                $query->where('fort_id', 'like', '%' . $search . '%')
                ->orWhereHas('subscription', function ($subscriptionQuery) use ($search) {
                        $subscriptionQuery->where('ref', 'like', '%' . $search . '%')
                            ->orWhereHas('package', function ($packageQuery) use ($search) {
                                $packageQuery->where('name', 'like', '%' . $search . '%')
                                    ->where('name_ar', 'like', '%' . $search . '%')
                                    ->orWhere('code', 'like', '%' . $search . '%');
                            })
                            ->orWhereHas('student', function ($studentQuery) use ($search) {
                                $studentQuery->where('firstname', 'like', '%' . $search . '%')
                                    ->orWhere('lastname', 'like', '%' . $search . '%');
                            });
                    });
            });
        }

        $payments = $payments->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'payments' => $payments->items(), 
            ],
            'pagination' => handlePagination($payments)
        ];

        return response()->json($response);
    }
}