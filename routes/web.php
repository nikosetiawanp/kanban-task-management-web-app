<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\SubtaskController;
use App\Http\Controllers\TaskController;
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
Route::get('/boards', [BoardController::class, 'index'])->middleware('auth');
Route::get('/boards/{id}', [BoardController::class, 'show'])->middleware('auth');
Route::post('/boards', [BoardController::class, 'store'])->middleware('auth');
Route::put('/boards/{id}', [BoardController::class, 'update'])->middleware('auth');
Route::delete('/boards/{id}', [BoardController::class, 'destroy'])->middleware('auth');

// Statuses
Route::post('/statuses', [StatusController::class, 'store'])->middleware('auth');
Route::put('/statuses/{id}', [StatusController::class, 'update'])->middleware('auth');


// Tasks
Route::get('/tasks', action: [TaskController::class, 'index'])->middleware('auth');
Route::get('/tasks/{id}', [TaskController::class, 'show'])->middleware('auth');
Route::post('/tasks', [TaskController::class, 'store'])->middleware('auth');
Route::put('/tasks/{id}', [TaskController::class, 'update'])->middleware('auth');
Route::delete('/tasks/{id}', [TaskController::class, 'destroy'])->middleware('auth');

// Subtasks
Route::get('/subtasks', [SubtaskController::class, 'index'])->middleware('auth');
Route::get('/subtasks/{id}', [SubtaskController::class, 'show'])->middleware('auth');
Route::post('/subtasks', [SubtaskController::class, 'store'])->middleware('auth');
Route::put('/subtasks/{id}', [SubtaskController::class, 'update'])->middleware('auth');
Route::delete('/subtasks/{id}', [SubtaskController::class, 'destroy'])->middleware('auth');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
