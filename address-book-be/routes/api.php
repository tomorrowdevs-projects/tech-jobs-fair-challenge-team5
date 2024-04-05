<?php

use App\Http\Controllers\Api\AuthController;
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

Route::get('/contacts', [ContactController::class, 'index'])->middleware('auth:sanctum');
Route::get('/contacts/{id}', [ContactController::class, 'show'])->middleware('auth:sanctum');
Route::post('/contacts', [ContactController::class, 'store'])->middleware('auth:sanctum');
Route::put('/contacts/{id}', [ContactController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/contacts/{id}', [ContactController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/types', [TypeController::class, 'index'])->middleware('auth:sanctum');
Route::get('/types/{id}', [TypeController::class, 'show'])->middleware('auth:sanctum');
Route::post('/types', [TypeController::class, 'store'])->middleware('auth:sanctum');
Route::put('/types/{id}', [TypeController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/types/{id}', [TypeController::class, 'destroy'])->middleware('auth:sanctum');

Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);
