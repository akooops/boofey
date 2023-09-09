<?php

namespace App\Http\Controllers\Api;

use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Requests\Subscriptions\StoreSubscriptionRequest;
use App\Http\Requests\Subscriptions\UpdateSubscriptionRequest;
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
        $search = $request->query('search');

        $subscriptions = Subscription::latest();

        if ($search) {
            $subscriptions->where('name', 'like', '%' . $search . '%')
            ->orWhere('code', 'like', '%' . $search . '%');
        }

        $subscriptions = $subscriptions->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $subscriptions->items(), 
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

        if($request->get('use_package_info') == true){
            $payment = Payment::create([
                'tax' => $package->tax,
                'subtotal' => $package->currentPrice,
                'package_id' => $package->id,
                'father_id' => $student->father->id,
                'coupon_id' => ($request->get('apply_coupon') == true) ? $request->get('coupon_id') : null
            ]);

            $payment->discount = $payment->calculateDiscount();
            $payment->total = $payment->calculateTotal();
            $payment->save();

            $subscription = Subscription::create([
                'days' => $package->days,
                'balance' => $package->days,
                'should_start_at' => $request->get('should_start_at'),
                'payment_id' => $payment->id,
                'student_id' => $student->id,
            ]);

            $subscription->save();
        }else{
            $payment = Payment::create([
                'tax' => $request->get('tax'),
                'subtotal' => $request->get('subtotal'),
                'package_id' => $package->id,
                'father_id' => $student->father->id,
                'coupon_id' => ($request->get('apply_coupon') == true) ? $request->get('coupon_id') : null
            ]);

            $payment->discount = $payment->calculateDiscount();
            $payment->total = $payment->calculateTotal();
            $payment->save();

            $subscription = Subscription::create([
                'days' => $request->get('days'),
                'balance' => $request->get('days'),
                'should_start_at' => $request->get('should_start_at'),
                'payment_id' => $payment->id,
                'student_id' => $student->id,
            ]);

            $subscription->save();
        }

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

        if($request->get('use_package_info') == true){
            $subscription->payment->update([
                'package_id' => $package->id,
            ]);

            if($request->get('update_prices') == true){
                $subscription->payment->update([
                    'tax' => $package->tax,
                    'subtotal' => $package->currentPrice,
                    'coupon_id' => ($request->get('apply_coupon') == true) ? $request->get('coupon_id') : null
                ]);

                $subscription->payment->discount = $subscription->payment->calculateDiscount();
                $subscription->payment->total = $subscription->payment->calculateTotal();
                $subscription->payment->save();
            }

            $subscription->update([
                'days' => $package->days,
                'balance' => $request->get('balance'),
                'should_start_at' => $request->get('should_start_at'),
            ]);

            $subscription->save();
        }else{
            $subscription->payment->update([
                'package_id' => $package->id,
            ]);

            if($request->get('update_prices') == true){
                $subscription->payment->update([
                    'tax' => $request->get('tax'),
                    'subtotal' => $request->get('subtotal'),
                    'coupon_id' => ($request->get('apply_coupon') == true) ? $request->get('coupon_id') : null
                ]);

                $subscription->payment->discount = $subscription->payment->calculateDiscount();
                $subscription->payment->total = $subscription->payment->calculateTotal();
                $subscription->payment->save();
            }

            $subscription->update([
                'days' => $package->days,
                'balance' => $request->get('balance'),
                'should_start_at' => $request->get('should_start_at'),
            ]);
        }

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