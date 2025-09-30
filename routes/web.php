<?php

use App\Http\Controllers\BoardController;
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

// Tasks

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
