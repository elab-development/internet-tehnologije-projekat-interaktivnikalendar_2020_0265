<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    function __construct()
    {
         
    }

    public function index()
    {
        $categories = Category::all();
        return new CategoryCollection($categories);
    }

    public function show(Category $category){
        return new CategoryResource($category);
    }
    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'slug'=>'required|string|max:100'
        ]);
    
        if($validator->fails())
        return response()->json($validator->errors());
    
        $category->name = $request->name;
        $category->slug = $request->slug;
    
        $category->save();
    
        return response()->json(['Category is updated successfully.', new CategoryResource($category)]);
    }
}
