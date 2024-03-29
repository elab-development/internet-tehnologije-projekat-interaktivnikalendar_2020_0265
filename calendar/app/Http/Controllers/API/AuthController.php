<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username'=>'required|string|max:255',
            'email'=>'required|string|max:255|email|unique:users',
            'password'=>'required|string|min:8'
        ]);

        if($validator->fails())
        return response()->json($validator->errors());

        $user = User::create([
            'username'=>$request->username,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['data'=>$user, 'access_token'=>$token, 'token_type'=>'Bearer']);
    }

    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email','password')))
        return response()->json(['success'=> false, 'message' => 'Unauthorized'], 401);

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['success'=> true, 'message'=>'Hi, '.$user->username. ' welcome to home.', 'user_id'=> $user->id, 'access_token'=>$token, 'token_type'=>'Bearer']);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return[
            'message' => "You have successfully logged out and the token was successfully deleted."
        ];
    }
}
