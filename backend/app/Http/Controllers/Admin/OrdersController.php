<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Requests\Orders\StoreOrderRequest;
use App\Http\Requests\Orders\UpdateOrderRequest;
use App\Models\File;

class OrdersController extends Controller
{
    /**
     * Display all orders
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = $request->query('search');

        $orders = Order::with([
            'orderItems',
            'orderItems.product',
            'orderItems.product.image',
        ])->latest();

        $orders = $orders->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $orders->items(), 
            'pagination' => handlePagination($orders)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created order
     * 
     * @param Order $order
     * @param StoreOrderRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request) 
    {
        $order = Order::create($request->validated());

        $order->save();

        $order->saveOrderItems($request->input('products'));
        $order->calculateTotal();

        $order->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show order data
     * 
     * @param Order $order
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'order' => $order
            ]
        ]);
    }

    /**
     * Update order data
     * 
     * @param Order $order
     * @param UpdateOrderRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Order $order, UpdateOrderRequest $request) 
    {
        $order->update(array_merge(
            $request->validated(),
            [
                'subtotal' => 0,
                'discount' => ($request->has('discount') || $request->input('discount') != null) ? $request->input('discount') : 0,
                'tax' => ($request->has('tax') || $request->input('tax') != null) ? $request->input('tax') : 0,
            ]
        ));

        $order->saveOrderItems($request->input('products'));
        $order->calculateTotal();
        $order->save();


        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete order data
     * 
     * @param Order $order
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order) 
    {
        $order->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}