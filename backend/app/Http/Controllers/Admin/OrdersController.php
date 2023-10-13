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
        $search = checkIfSearchEmpty($request->query('search'));

        $orders = Order::with([
            'orderItems',
            'orderItems.product:id,name,price,sale_price,category_id,file_id',
            'orderItems.product.image:id,current_name,path',
            'orderItems.product.category:id,name',
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
        $products = $request->input('products');

        if(is_string($products) && json_decode($products) !== null) {
            $products = json_decode($products, true);
        }

        if(count($products) == 0){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'products' => ['At least one product should be added']
                ],
            ], 422);
        }

        $order = Order::create($request->validated());

        $order->save();

        $order->saveOrderItems($products);
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
        $order->load([
            'orderItems',
            'orderItems.product',
            'orderItems.product.image',
            'orderItems.product.category',
        ]);

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
        $products = $request->input('products');

        if(is_string($products) && json_decode($products) !== null) {
            $products = json_decode($products, true);
        }

        if(count($products) == 0){
            return response()->json([
                'status' => 'error',
                'errors' => [
                    'products' => ['At least one product should be added']
                ],
            ], 422);
        }

        $order->update(array_merge(
            $request->validated(),
            [
                'subtotal' => 0,
                'discount' => ($request->has('discount') || $request->input('discount') != null) ? $request->input('discount') : 0,
                'tax' => ($request->has('tax') || $request->input('tax') != null) ? $request->input('tax') : 0,
            ]
        ));

        $order->saveOrderItems($products);
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