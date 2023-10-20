<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Subscriptions\EnableSubscriptionRequest;
use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Requests\Subscriptions\StoreSubscriptionRequest;
use App\Http\Requests\Subscriptions\UpdateSubscriptionRequest;
use App\Models\Coupon;
use App\Models\File;
use App\Models\Package;
use App\Models\Payment;
use App\Models\Student;

class SubscriptionsController extends Controller
{
    /**
     * Display all subscriptions
     * 
     * @return \Illuminate\Http\Response
     */

     public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $subscriptions = Subscription::with([
            'invoice:id,subscription_id',
            'package:id,name,name_ar,sale_price,price,days,tax,popular,school_id',
            'package.school:id,name,name_ar,file_id',
            'package.school.logo:id,path,current_name',
            'student:id,firstname,lastname,file_id',
            'student.image:id,current_name,path'
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

        $response = [
            'status' => 'success',
            'data' => [
                'subscriptions' => $subscriptions->items(), 
            ],
            'pagination' => handlePagination($subscriptions)
        ];

        return response()->json($response);
    }

    public function indexByStudent(Student $student, Request $request) 
    {

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


    public function store(StoreSubscriptionRequest $request) 
    {
        $studentID = $request->get('student_id');
        $student = Student::findOrFail($studentID);

        $this->createSubscription($request, $student);
    
        return response()->json([
            'status' => 'success'
        ]);
    }

        /**
     * Store a newly created academicYear
     * 
     * @param AcademicYear $academicYear
     * @param StoreAcademicYearRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function storeByStudent(Student $student, StoreSubscriptionRequest $request) 
    {
        $this->createSubscription($request, $student);

        return response()->json([
            'status' => 'success'
        ]);
    }

    private function createSubscription($request, Student $student = null) 
    {
        $package = Package::findOrFail($request->get('package_id'));

        $subscription = Subscription::create([
            'initiated_at' => now(),
            'exclude_from_calculation' => $request->get('exclude_from_calculation'),
            'student_id' => $student->id,
        ]);

        if($request->get('apply_discount') == true && $request->get('apply_coupon') == false)
            $subscription->applyDiscount($request->get('discount'));
        else if($request->get('apply_discount') == true && $request->get('apply_coupon') == true)
            $subscription->applyCoupon($request->get('coupon_id'));
        else
            $subscription->applyDiscount(null);

        $subscription->applyTax($request->get('tax'));
        $subscription->applyPackage($package);
        $subscription->calculateTotal();
        $subscription->save();

        $subscription->generateInvoice();
    }

    /**
     * Show subscription data
     * 
     * @param Subscription $subscription
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Subscription $subscription) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'subscription' => $subscription
            ]
        ]);
    }

    /**
     * Update subscription data
     * 
     * @param Subscription $subscription
     * @param UpdateSubscriptionRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Subscription $subscription, UpdateSubscriptionRequest $request) 
    {
        $subscription->update([
            'exclude_from_calculation' => $request->get('exclude_from_calculation'),
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function enable(Subscription $subscription, EnableSubscriptionRequest $request) 
    {
        $subscription->update([
            'status' => 'inactive'
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function disable(Subscription $subscription) 
    {
        $subscription->update([
            'status' => 'disabled'
        ]);

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function generateInvoice(Subscription $subscription) 
    {
        $invoiceID = $subscription->generateInvoice();
        if($invoiceID == null){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'invoice_id' => 'This subscription already have an invoice.'
                ],
            ], 422);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'invoice_id' => $invoiceID
            ]
        ]);
    }
}