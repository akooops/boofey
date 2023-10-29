<?php

namespace App\Http\Controllers;

use App\Http\Requests\Subscriptions\GenerateInvoiceRequest;
use App\Http\Requests\Subscriptions\InitSubscriptionRequest;
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
    public function indexByStudent(Student $student, Request $request) 
    {
        $father = $request->get('father');

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        $student->load([
            'image:id,path,current_name', 
        ]);

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $activeSubscription = $student->activeSubscription()->with([
            'invoice:id,subscription_id',
            'package:id,name,name_ar,sale_price,price,days,tax,popular,school_id',
            'package.school:id,name,name_ar,file_id',
            'package.school.logo:id,path,current_name'
        ])->first(); 

        $inactiveSubscriptions = $student->inactiveSubscriptions()->with([
            'invoice:id,subscription_id',
            'package:id,name,name_ar,sale_price,price,days,tax,popular,school_id',
            'package.school:id,name,name_ar,file_id',
            'package.school.logo:id,path,current_name'
        ])->latest()->get(); 

        $subscriptions = $student->subscriptionsWithoutActive()->with([
            'invoice:id,subscription_id',
            'package:id,name,name_ar,sale_price,price,days,tax,popular,school_id',
            'package.school:id,name,name_ar,file_id',
            'package.school.logo:id,path,current_name'
        ])->latest();

        if ($search) {
            $subscriptions->where(function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->whereHas('package', function ($packageQuery) use ($search) {
                        $packageQuery->where('name', 'like', '%' . $search . '%')
                            ->orWhere('name_ar', 'like', '%' . $search . '%')
                            ->orWhere('code', 'like', '%' . $search . '%')
                            ->orWhere('description', 'like', '%' . $search . '%');
                    });
                });
            });
        }

        $subscriptions = $subscriptions->paginate($perPage, ['*'], 'page', $page);
        $packages = ($student->school !== null) 
            ? $student->school->packages()->select('id', 'name', 'price', 'sale_price', 'days', 'tax')->get()
            : [];

        $response = [
            'status' => 'success',
            'data' => [
                'subscriptions' => $subscriptions->items(), 
                'activeSubscription' => $activeSubscription,
                'inactiveSubscriptions' => $inactiveSubscriptions,
                'student' => $student->makeHidden([
                    'otp', 'otp_expires_at', 'nfc_id', 
                    'face_id', 'activeSubscription', 'subscribed', 
                    'tookSnackToday', 'tookMainMealToday', 'class',
                    'created_at', 'updated_at'
                ]),
                'packages' => $packages
            ],
            'pagination' => handlePagination($subscriptions)
        ];

        return response()->json($response);
    }

    public function init(InitSubscriptionRequest $request){
        $father = $request->get('father');

        $student = Student::findOrFail($request->get('student_id'));
        $package = Package::findOrFail($request->get('package_id'));

        if($student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        if($package->school_id != $student->school_id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        if($package->hidden == true){
            return response()->json([
                'status' => 'error',
                'message' => __('translations.404')
            ], 404);
        }

        Subscription::where([
            'student_id' => $student->id,
            'status' => 'initiated'
        ])->delete();

        $subscription = Subscription::create([
            'status' => 'initiated',
            'initiated_at' => now(),
            'exclude_from_calculation' => 1,
            'student_id' => $student->id,
        ]);

        $subscription->applyDiscount(null);
        $subscription->applyTax($package->tax);
        $subscription->applyPackage($package);
        $subscription->calculateTotal();
        $subscription->save();
        
        $student->load(
            'image:id,path,current_name'
        );

        return response()->json([
            'status' => 'success',
            'data' => [
                'package' => $package->makeHidden(['created_at', 'updated_at']),
                'student' => $student->makeHidden([
                    'otp', 'otp_expires_at', 'nfc_id', 
                    'face_id', 'activeSubscription', 'subscribed', 
                    'tookSnackToday', 'tookMainMealToday', 'class',
                    'created_at', 'updated_at'
                ]),
                'subscription' => $subscription,
                'customer_ip' => $request->ip(),
                'customer_email' => $father->user->email
            ]
        ]);
    }

    public function generateInvoice(Subscription $subscription, GenerateInvoiceRequest $request) 
    {
        $father = $request->get('father');

        if($subscription->student->father_id != $father->id){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '403' => __('translations.403')
                ]
            ], 403);
        }

        $invoiceID = $subscription->generateInvoice();

        return response()->json([
            'status' => 'success',
            'data' => [
                'invoice_id' => $invoiceID
            ]
        ]);
    }
}