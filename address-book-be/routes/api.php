<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\TypeController;
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

Route::get('/contacts', [ContactController::class, 'index']);
Route::get('/contacts/{id}', [ContactController::class, 'show']);
Route::post('/contacts', [ContactController::class, 'store']);
Route::put('/contacts/{id}', [ContactController::class, 'update']);
Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

Route::get('/types', [TypeController::class, 'index']);
Route::get('/types/{id}', [TypeController::class, 'show']);
Route::post('/types', [TypeController::class, 'store']);
Route::put('/types/{id}', [TypeController::class, 'update']);
Route::delete('/types/{id}', [TypeController::class, 'destroy']);
