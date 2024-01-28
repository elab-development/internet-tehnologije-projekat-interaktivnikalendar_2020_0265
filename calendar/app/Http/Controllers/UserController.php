<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    function __construct()
    {
         $this->middleware('permission:user-delete', ['only' => ['delete']]);
    }

    public function index()
    {
        $users = User::all();
        return new UserCollection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $user = new UserResource(User::find($user_id));
        if(is_null($user))
        return response()->json('Data not found', 404);
    return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($user_id)
    {
        $user = new UserResource(User::find($user_id));
        User::whereId($user_id)->delete();
        return response()->json(['User is deleted successfully.', $user]);
    }

    public function changePassword(Request $request, $user_id){
        $request->validate([
            'new_password' => 'required',
            'new_password_confirm' => 'required',
        ]);


        if($request->new_password != $request->new_password_confirm){
            return response()->json('Passwords do not match!');
        }

        User::whereId($user_id)->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json('Password change successful!');
    }
}
