<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    public function show($user_id)
    {
        $user = new UserResource(User::find($user_id));
        if (is_null($user))
            return response()->json('Data not found', 404);
        $image = Image::where('user_id', $user_id)->firstOrFail();
        return response()->json($image);
    }

    public function upload($user_id, Request $request)
    {
        if ($request->has('image')) {
            if(Image::where('user_id', $user_id) != null){
                Image::where('user_id', $user_id)->delete();
            }
            $image = $request->file('image');

            $name = time() . '.' . $image->getClientOriginalExtension();
            $image->move('images/', $name);

            Image::create(['name' => $name, 'user_id' => $user_id]);

            return response()->json(['success' => 'true']);
        }

        return response()->json('Error adding image.');
    }
}
