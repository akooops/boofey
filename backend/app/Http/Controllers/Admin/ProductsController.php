<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Models\Category;
use App\Models\File;

class ProductsController extends Controller
{
    /**
     * Display all products
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $category = $request->query('category', null);

        $products = Product::orderBy('id', 'DESC')->with([
            'category:id,name,name_ar',
            'image:id,path,current_name', 
        ]);

        if($category != null){
            $category = Category::findOrFail($category);
            $products->where('category_id', $category->id);
        }

        if ($search) {
            $products
                ->where('id', $search)
                ->orWhere('name', 'like', '%' . $search . '%')
                ->orWhere('name_ar', 'like', '%' . $search . '%');
        }

        $products = $products->paginate($perPage, ['*'], 'page', $page);

        $categories = Category::select('id', 'name', 'name_ar')->get();

        $response = [
            'status' => 'success',
            'data' => [
                'products' => $products->items(), 
                'categories' => $categories
            ],
            'pagination' => handlePagination($products)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created product
     * 
     * @param Product $product
     * @param StoreProductRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request) 
    {
        $file = uploadFile($request->file('file'), 'products');

        $product = Product::create(array_merge(
            $request->validated(),
            ['file_id' => $file->id]
        ));

        $product->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show product data
     * 
     * @param Product $product
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'product' => $product
            ]
        ]);
    }

    /**
     * Update product data
     * 
     * @param Product $product
     * @param UpdateProductRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Product $product, UpdateProductRequest $request) 
    {
        $file = File::find($product->file_id);

        if($request->file('file')) {
            removeFile($file);

            $file = uploadFile($request->file('file'), 'products');
        }

        $product->update(array_merge(
            $request->validated(),
            [
                'file_id' => $file->id,
                'sale_price' => ($request->has('sale_price') || $request->input('sale_price') != null) ? $request->input('sale_price') : null,
            ]
        ));

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete product data
     * 
     * @param Product $product
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product) 
    {
        $file = File::find($product->file_id);

        $product->delete();

        removeFile($file);

        return response()->json([
            'status' => 'success'
        ]);
    }
}