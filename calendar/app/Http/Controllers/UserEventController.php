<?php

namespace App\Http\Controllers;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class UserEventController extends Controller
{
    public function index($user_id)
    {
        $events = new EventCollection(Event::get()->where('user_id', $user_id));
        if(count($events)==0)
        return response()->json('Data not found', 404);
    return response()->json($events);
    }

    public function show($user_id, $event_id)
    {
        $events = (Event::get()->where('user_id', $user_id));
        $e = array();
        foreach($events as &$value)
        {
            array_push($e, new EventResource($value));
        }
        if($event_id-1 < count($e))
            $event = array_values($e)[$event_id-1];
        else
            $event = null;
        if(is_null($event))
        return response()->json('Data not found', 404);
    return response()->json($event);
    }
}
