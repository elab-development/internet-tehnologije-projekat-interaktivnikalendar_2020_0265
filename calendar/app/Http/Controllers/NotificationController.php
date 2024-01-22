<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationCollection;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = Notification::all();
        return new NotificationCollection($notifications);
    }

    public function show(Notification $notification){
        return new NotificationResource($notification);
    }
}
