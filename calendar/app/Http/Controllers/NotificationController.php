<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Http\Resources\NotificationCollection;
use App\Http\Resources\NotificationResource;
use App\Models\Event;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title'=>'required|string|max:255',
            'description'=>'required|string|max:255',
            'slug'=>'required|string|max:100',
            'hoursBefore'=>'required',
            'event_id'=>'required'
        ]);
    
        if($validator->fails())
        return response()->json($validator->errors());
        if((Event::find($request->event_id))->user_id != Auth::user()->id)
        return response(['message' => 'Notification must be for logged users event!'], 403);
    
        $notification=Notification::create([
            'title'=>$request->title,
            'description'=>$request->description,
            'slug'=>$request->slug,
            'hoursBefore'=>$request->hoursBefore,
            'event_id'=>$request->event_id
        ]);
    
        return response()->json(['Notification is created successfully.', new NotificationResource($notification)]);
    }
    
    public function update(Request $request, Notification $notification)
    {
        $validator = Validator::make($request->all(),[
            'title'=>'required|string|max:255',
            'description'=>'required|string|max:255',
            'slug'=>'required|string|max:100',
            'hoursBefore'=>'required',
            'event_id'=>'required'
        ]);
    
        if($validator->fails())
        return response()->json($validator->errors());
        if((Event::find($request->event_id))->user_id != Auth::user()->id)
        return response(['message' => 'Notification must be for logged users event!'], 403);
    
        $notification->title = $request->title;
        $notification->description = $request->description;
        $notification->slug = $request->slug;
        $notification->hoursBefore = $request->hoursBefore;
        $notification->event_id = $request->event_id;
    
        $notification->save();
    
        return response()->json(['Notification is updated successfully.', new NotificationResource($notification)]);
    }
    
    public function destroy(Notification $notification)
    {
        if((Event::find($notification->event_id))->user_id != Auth::user()->id)
        return response(['message' => 'Notification must be for logged users event!'], 403);

        $notification->delete();
    
        return response()->json('Notification is deleted successfully.');
    }

    public function index()
    {
        $notifications = Notification::all();
        return new NotificationCollection($notifications);
    }

    public function show(Notification $notification){
        return new NotificationResource($notification);
    }
}
