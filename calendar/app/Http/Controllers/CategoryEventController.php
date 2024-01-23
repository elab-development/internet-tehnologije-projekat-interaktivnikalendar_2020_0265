<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;

class CategoryEventController extends Controller
{
    public function index($category_id)
    {
        $events = new EventCollection(Event::get()->where('category_id', $category_id));
        if(count($events)==0)
        return response()->json('Data not found', 404);
    return response()->json($events);
    }

    public function show($category_id, $index)
    {
        $events = (Event::get()->where('category_id', $category_id));
        $e = array();
        foreach($events as &$value)
        {
            array_push($e, new EventResource($value));
        }
        if($index-1 < count($e))
            $event = array_values($e)[$index-1];
        else
            $event = null;
        if(is_null($event))
        return response()->json('Data not found', 404);
    return response()->json($event);
    }
}
