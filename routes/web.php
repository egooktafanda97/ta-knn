<?php

use App\Http\Controllers\DashbaordController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\KnnController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TrainController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashbaordController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dataset', [DataController::class, 'index'])->name('dataset.index');
    Route::post('/data-udpate/update/{id}', [DataController::class, 'update']);
    Route::delete('/data-dalate/{id}', [DataController::class, 'destroy']);

    Route::resource('/dataset', DataController::class);

    Route::get('/train', [TrainController::class, 'useTrainModel'])->name('train.train');
    Route::get('/knn', [KnnController::class, 'show'])->name('knn.show');
});

require __DIR__ . '/auth.php';
