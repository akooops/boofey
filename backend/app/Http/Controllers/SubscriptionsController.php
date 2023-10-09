<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Requests\Subscriptions\StoreSubscriptionRequest;
use App\Http\Requests\Subscriptions\UpdateSubscriptionRequest;
use App\Models\Coupon;
use App\Models\Father;
use App\Models\File;
use App\Models\Package;
use App\Models\Payment;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;

class SubscriptionsController extends Controller
{
    /**
     * Display all subscriptions
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Student $student, Request $request) 
    {
        $user = Auth::user();
        $father = Father::where('user_id', $user->id)->first();

        if($father === null){
            return response()->json([
                'status' => 'error',
                'message' => 'Oops! Resource Not Found. The Resource you are looking for is not available or has been moved.'
            ], 404);
        }

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => 'Access Denied: Please Log In to Access This Resource'
                ]
            ], 403);
        }

        $student->load([
            'image:id,path,current_name', 
        ]);

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $subscriptions = Subscription::with([
            'payment',
            'payment.coupon',
            'payment.package:id,name,school_id',
            'payment.package.school:id,name,file_id',
            'payment.package.school.logo:id,current_name,path',
            'payment.billing:firstname,lastname,email,phone,address,country,state,zipcode',
        ])->where('student_id', $student->id)->latest();

        $activeSubscription = $student->subscriptions()
            ->where('balance', '>', 0)
            ->where('started_at', '!=', NULL)
            ->with([
                'payment',
                'payment.coupon',
                'payment.package',
                'payment.package.school',
                'payment.package.school.logo',
                'payment.billing:firstname,lastname,email,phone,address,country,state,zipcode',
            ])
            ->first();
                
        if($activeSubscription)
            $subscriptions->whereNot('id', $activeSubscription->id);

        if ($search) {
            $subscriptions->where(function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('payment', function ($paymentQuery) use ($search) {
                            $paymentQuery->whereHas('package', function ($packageQuery) use ($search) {
                                $packageQuery->where('name', 'like', '%' . $search . '%')
                                    ->orWhere('code', 'like', '%' . $search . '%')
                                    ->orWhere('description', 'like', '%' . $search . '%');
                                });
                        });
                });
            });
        }

        $subscriptions = $subscriptions->paginate($perPage, ['*'], 'page', $page);
        $packages = Package::select('id', 'name')->where('school_id', $student->school_id)->get()->makeHidden(['currentPrice']);

        $response = [
            'status' => 'success',
            'data' => [
                'subscriptions' => $subscriptions->items(), 
                'activeSubscription' => $activeSubscription,
                'student' => $student->makeHidden([
                    'otp', 'otp_expires_at', 'nfc_id', 
                    'face_id', 'currentSubscription', 'subscribed', 
                    'tookSnackToday', 'tookMainMealToday', 'class',
                    'created_at', 'updated_at'
                ]),
                'packages' => $packages
            ],
            'pagination' => handlePagination($subscriptions)
        ];

        return response()->json($response);
    }
}