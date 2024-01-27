<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryEventController;
use App\Http\Controllers\EventNotificationController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::get('events/{id}', [EventTestController::class, 'show']);
//Route::get('events', [EventTestController::class, 'index']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users/{id}/change-password', [UserController::class, 'changePassword']);

//Route::resource('events', EventController::class);

Route::resource('events', EventController::class)->only(['index', 'show']);

Route::resource('categories', CategoryController::class);

Route::resource('notifications', NotificationController::class)->only(['index', 'show']);

Route::resource('users.events', UserEventController::class);
//Route::get('/users/{uid}/events/{eid}', [UserEventController::class, 'show']);

Route::resource('categories.events', CategoryEventController::class);

Route::resource('events.notifications', EventNotificationController::class);

Route::delete('/users/{id}', [UserController::class, 'delete']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::get('/profile', function(Request $request){
        return auth()->user();
    });
    Route::resource('events', EventController::class)->only(['update', 'store', 'destroy']);
    
    Route::resource('notifications', NotificationController::class)->only(['update', 'store', 'destroy']);
    

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('roles/assign-permission', [RoleController::class, 'assignPermission']);
Route::post('roles/remove-permission', [RoleController::class, 'removePermission']);
Route::resource('roles', RoleController::class);
Route::group(['middleware' => ['auth']], function() {
});