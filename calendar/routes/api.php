<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryEventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\UserEventController2;
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

Route::resource('events', EventController::class);

Route::resource('categories', CategoryController::class);

Route::resource('users.events', UserEventController::class);
//Route::get('/users/{uid}/events/{eid}', [UserEventController::class, 'show']);

Route::resource('categories.events', CategoryEventController::class);