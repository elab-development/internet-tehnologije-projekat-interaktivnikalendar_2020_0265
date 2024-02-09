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


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/users/change-password', [UserController::class, 'changePassword']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::delete('/users/{id}', [UserController::class, 'delete']);
    Route::put('/users', [UserController::class, 'update']);

    Route::resource('events', EventController::class);

    Route::resource('categories', CategoryController::class);

    Route::resource('notifications', NotificationController::class)->only(['index', 'show']);

    Route::resource('users.events', UserEventController::class);

    Route::resource('categories.events', CategoryEventController::class);

    Route::resource('events.notifications', EventNotificationController::class);

    Route::resource('notifications', NotificationController::class)->only(['update', 'store', 'destroy']);

    Route::post('/roles/assign-permission', [RoleController::class, 'assignPermission']);
    Route::post('/roles/remove-permission', [RoleController::class, 'removePermission']);
    Route::post('/roles/assign', [RoleController::class, 'assignRole']);
    Route::resource('roles', RoleController::class);

    Route::post('/logout', [AuthController::class, 'logout']);
});