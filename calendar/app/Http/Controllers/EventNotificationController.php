<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Resources\NotificationResource;
use App\Http\Resources\NotificationCollection;
use App\Models\Event;

class EventNotificationController extends Controller
{
    public function index($event_id)
    {
        $notifications = new NotificationCollection(Notification::get()->where('event_id', $event_id));
        if(count($notifications)==0)
        return response()->json('Data not found', 404);
    return response()->json($notifications);
    }

    public function show($event_id, $index)
    {
        $notifications = (Notification::get()->where('event_id', $event_id));
        $n = array();
        foreach($notifications as &$value)
        {
            array_push($n, new NotificationResource($value));
        }
        if($index-1 < count($n))
            $notification = array_values($n)[$index-1];
        else
            $notification = null;
        if(is_null($notification))
        return response()->json('Data not found', 404);
    return response()->json($notification);
    }
}
