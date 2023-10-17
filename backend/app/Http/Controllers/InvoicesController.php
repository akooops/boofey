<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Subscriptions\EnableSubscriptionRequest;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Requests\Subscriptions\StoreSubscriptionRequest;
use App\Http\Requests\Subscriptions\UpdateSubscriptionRequest;
use App\Models\Coupon;
use App\Models\File;
use App\Models\Invoice;
use App\Models\Package;
use App\Models\Payment;
use App\Models\Student;

class InvoicesController extends Controller
{
    /**
     * Display all subscriptions
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $father = $request->get('father');

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $invoices = Invoice::where('father_id', $father->id)->latest()->with([
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
            $invoices->where(function ($query) use ($search) {
                $query->whereHas('subscription', function ($subscriptionQuery) use ($search) {
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

        $invoices = $invoices->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => [
                'invoices' => $invoices->items(), 
            ],
            'pagination' => handlePagination($invoices)
        ];

        return response()->json($response);
    }

    /**
     * Show subscription data
     * 
     * @param Subscription $subscription
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice, Request $request) 
    {
        $father = $request->get('father');

        if($invoice->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }
        
        $invoice->load([
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

        return response()->json([
            'status' => 'success',
            'data' => [
                'invoice' => $invoice
            ]
        ]);
    }
}