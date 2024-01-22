<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Http\Resources\EventCollection;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
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
