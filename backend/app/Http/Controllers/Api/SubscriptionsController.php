<?php

namespace App\Http\Controllers\Api;

use App\Models\Subscription;
use Illuminate\Http\Request;
use App\Http\Requests\Subscriptions\StoreSubscriptionRequest;
use App\Http\Requests\Subscriptions\UpdateSubscriptionRequest;
use App\Models\File;

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
    public function store(StoreSubscriptionRequest $request) 
    {
        $subscription = Subscription::create(array_merge($request->all()));

        $subscription->save();

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

        if ($request->get('expire_at') == null) {
            $request->merge(['expire_at' => null]);
        }

        $subscription->update(array_merge($request->all()));

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

        return response()->json([
            'status' => 'success'
        ]);
    }
}