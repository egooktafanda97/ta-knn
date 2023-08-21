<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("import", [\App\Http\Controllers\TrainController::class, "importData"]);
Route::get("proccess", [\App\Http\Controllers\TrainController::class, "preprocessingCLuster"]);
Route::get("scaling", [\App\Http\Controllers\TrainController::class, "preprocessingSplitData"]);
Route::get("minmax", [\App\Http\Controllers\TrainController::class, "preprocessingMinMax"]);
Route::get("train", [\App\Http\Controllers\TrainController::class, "train"]);
Route::post("predik", [\App\Http\Controllers\TrainController::class, "predik"]);
Route::delete("predik/{id}", [\App\Http\Controllers\TrainController::class, "destroy"]);
Route::get("test", [\App\Http\Controllers\TrainController::class, "test"]);
Route::get("setup", [\App\Http\Controllers\TrainController::class, "setups"]);

Route::post("insert-dataset", [\App\Http\Controllers\DataController::class, "store"]);
