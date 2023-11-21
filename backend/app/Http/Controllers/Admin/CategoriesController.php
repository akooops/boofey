<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Requests\Categories\UpdateCategoryRequest;
use App\Models\File;

class CategoriesController extends Controller
{
    /**
     * Display all categories
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) 
    {
        $perPage = limitPerPage($request->query('perPage', 10));
        $page = checkPageIfNull($request->query('page', 1));
        $search = checkIfSearchEmpty($request->query('search'));

        $categories = Category::orderBy('id', 'DESC');

        if ($search) {
            $categories
            ->where('id', $search)
            ->orWhere('name', 'like', '%' . $search . '%')
            ->orWhere('name_ar', 'like', '%' . $search . '%');
        }

        $categories = $categories->paginate($perPage, ['*'], 'page', $page);

        $response = [
            'status' => 'success',
            'data' => $categories->items(), 
            'pagination' => handlePagination($categories)
        ];

        return response()->json($response);
    }

    /**
     * Store a newly created category
     * 
     * @param Category $category
     * @param StoreCategoryRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategoryRequest $request) 
    {
        $category = Category::create(array_merge($request->validated()));

        $category->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Show category data
     * 
     * @param Category $category
     * 
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category) 
    {
        return response()->json([
            'status' => 'success',
            'data' => [
                'category' => $category
            ]
        ]);
    }

    /**
     * Update category data
     * 
     * @param Category $category
     * @param UpdateCategoryRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function update(Category $category, UpdateCategoryRequest $request) 
    {
        $category->update($request->validated());

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Delete category data
     * 
     * @param Category $category
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category) 
    {
        $category->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }
}