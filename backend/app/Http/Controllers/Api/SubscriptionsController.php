<?php

namespace App\Http\Controllers\Api;

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
    public function index($id, Request $request) 
    {
        $student = Student::with('image:id,current_name,path')->find($id);

        if (!$student) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $subscriptions = Subscription::with([
            'payment',
            'payment.coupon',
            'payment.package',
            'payment.package.school',
            'payment.package.school.logo',
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
        $packages = Package::where('school_id', $student->school_id)->get();

        $response = [
            'status' => 'success',
            'data' => [
                'subscriptions' => $subscriptions->items(), 
                'activeSubscription' => $activeSubscription,
                'student' => $student,
                'packages' => $packages
            ],
            'pagination' => handlePagination($subscriptions)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created subscription
     * 
     * @param Subscription $subscription
     * @param StoreSubscriptionRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store($id, StoreSubscriptionRequest $request) 
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $package = Package::find($request->get('package_id'));

        $payment = Payment::create([
            'father_id' => $student->father->id,
        ]);

        $days = 0;
        $balance = 0;

        if($request->get('use_package_info') == true){
            $payment->saveFromPackageInfo($package);
            $days = $package->days;
            $balance = $package->days;

        }else{
            $payment->saveFromPackageInfo($package, false, $request->get('tax'), $request->get('subtotal'));
            $days = $request->get('days');
            $balance = $request->get('days');
        }

        if($request->get('apply_coupon') == true){
            $coupon = Coupon::find($request->get('coupon_id'));
            $payment->applyCoupon($coupon);
        }

        $payment->calculateTotal();
        $payment->save();
        $payment->saveSubscriptionInfo($student, $days, $balance, $request->get('should_start_at'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show subscription data
     * 
     * @param Subscription $subscription
     * 
     * @return \Illuminate\Http\Response
     */
    public function show($id) 
    {
        $subscription = Subscription::find($id);

        if (!$subscription) {
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
    public function update($id, UpdateSubscriptionRequest $request) 
    {
        $subscription = Subscription::find($id);
        
        if (!$subscription) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $package = Package::find($request->get('package_id'));

        if($request->get('update_prices') == true){
            
            if($request->get('use_package_info')){
                $subscription->payment->saveFromPackageInfo($package);
            }else{
                $subscription->payment->saveFromPackageInfo($package, false, $request->get('tax'), $request->get('subtotal'));
            }

            if($request->get('apply_coupon') == true){
                $coupon = Coupon::find($request->get('coupon_id'));
                $subscription->payment->applyCoupon($coupon);
            }

            $subscription->payment->calculateTotal();
        }else{
            $subscription->payment->package_id = $package->id;
        }

        $days = $request->get('days');
        $balance = $request->get('balance');

        $subscription->payment->save();
        $subscription->payment->updateSubscriptionInfo($days, $balance, $request->get('should_start_at'));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete subscription data
     * 
     * @param Subscription $subscription
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) 
    {
        $subscription = Subscription::find($id);

        if (!$subscription) {
            return response()->json([
                'status' => 'error',
                'errors' => [
                    '404' => 'Not found.'
                ]
            ], 404);
        }

        $subscription->delete();
        $subscription->payment->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}