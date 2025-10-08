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
Route::get('/boards', [BoardController::class, 'index']);
Route::get('/boards/{id}', [BoardController::class, 'show']);
Route::post('/boards', [BoardController::class, 'store']);
Route::put('/boards/{id}', [BoardController::class, 'update']);
Route::delete('/boards/{id}', [BoardController::class, 'destroy']);

// Statuses
Route::post('/statuses', [StatusController::class, 'store']);
Route::put('/statuses/{id}', [StatusController::class, 'update']);


// Tasks
Route::get('/tasks', action: [TaskController::class, 'index']);
Route::get('/tasks/{id}', [TaskController::class, 'show']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::put('/tasks/{id}', [TaskController::class, 'update']);
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

// Subtasks
Route::get('/subtasks', [SubtaskController::class, 'index']);
Route::get('/subtasks/{id}', [SubtaskController::class, 'show']);
Route::post('/subtasks', [SubtaskController::class, 'store']);
Route::put('/subtasks/{id}', [SubtaskController::class, 'update']);
Route::delete('/subtasks/{id}', [SubtaskController::class, 'destroy']);



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
