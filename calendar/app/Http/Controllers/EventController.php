<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Http\Resources\EventCollection;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
public function store(Request $request)
{
    $validator = Validator::make($request->all(),[
        'name'=>'required|string|max:255',
        'slug'=>'required|string|max:100',
        'start'=>'required',
        'end'=>'required',
        'category_id'=>'required'
    ]);

    if($validator->fails())
    return response()->json($validator->errors());

    $event=Event::create([
        'name'=>$request->name,
        'slug'=>$request->slug,
        'start'=>$request->start,
        'end'=>$request->end,
        'category_id'=>$request->category_id,
        'user_id'=>Auth::user()->id
    ]);

    return response()->json(['Event is created successfully.', new EventResource($event)]);
}

public function update(Request $request, Event $event)
{
    $validator = Validator::make($request->all(),[
        'name'=>'required|string|max:255',
        'slug'=>'required|string|max:100',
        'start'=>'required',
        'end'=>'required',
        'category_id'=>'required'
    ]);

    if($validator->fails())
    return response()->json($validator->errors());

    $event->name = $request->name;
    $event->slug = $request->slug;
    $event->start = $request->start;
    $event->end = $request->end;
    $event->category_id = $request->category_id;

    $event->save();

    return response()->json(['Event is updated successfully.', new EventResource($event)]);
}

public function destroy(Event $event)
{
    $event->delete();

    return response()->json((['Event is deleted successfully.', $event]));
}

    public function index()
    {
        $events = Event::all();
        return new EventCollection($events);
    }

    public function show(Event $event){
        //$event = Event::find($id);
        return new EventResource($event);
    }
}
