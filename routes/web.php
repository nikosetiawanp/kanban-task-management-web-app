<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\StatusController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Boards
Route::get('/boards', [BoardController::class, 'index']);
Route::get('/boards/{id}', [BoardController::class, 'show']);
Route::post('/boards', [BoardController::class, 'store']);
Route::put('/boards/{id}', [BoardController::class, 'update']);
Route::delete('/boards/{id}', [BoardController::class, 'destroy']);

// Statuses
Route::post('/boards/{board}/statuses/many', [StatusController::class, 'storeMany']);

// Tasks
Route::get('/tasks', action: [BoardController::class, 'index']);
Route::get('/tasks/{id}', [BoardController::class, 'show']);
Route::post('/tasks', [BoardController::class, 'store']);
Route::put('/tasks/{id}', [BoardController::class, 'update']);
Route::delete('/tasks/{id}', [BoardController::class, 'destroy']);

// Subtasks
Route::get('/subtasks', [BoardController::class, 'index']);
Route::get('/subtasks/{id}', [BoardController::class, 'show']);
Route::post('/subtasks', [BoardController::class, 'store']);
Route::put('/subtasks/{id}', [BoardController::class, 'update']);
Route::delete('/subtasks/{id}', [BoardController::class, 'destroy']);



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
