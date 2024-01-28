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
        $this->middleware('permission:category-list|category-create|category-edit|category-delete', ['only' => ['index','show']]);
        $this->middleware('permission:category-create', ['only' => ['create','store']]);
         $this->middleware('permission:category-edit', ['only' => ['edit','update']]);
         $this->middleware('permission:category-delete', ['only' => ['delete']]);
    }

    public function index()
    {
        $categories = Category::all();
        return new CategoryCollection($categories);
    }

    public function show(Category $category){
        return new CategoryResource($category);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'slug'=>'required|string|max:100'
        ]);
    
        if($validator->fails())
        return response()->json($validator->errors());
    
        $category=Category::create([
            'name'=>$request->name,
            'slug'=>$request->slug
        ]);
    
        return response()->json(['Category is created successfully.', new CategoryResource($category)]);
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
    public function delete($category_id)
    {
        $category = new CategoryResource(Category::find($category_id));
        Category::whereId($category_id)->delete();
        return response()->json(['Category is deleted successfully.', $category]);
    }
}
