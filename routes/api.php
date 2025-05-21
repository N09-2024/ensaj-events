<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PublicEventController;
use App\Http\Controllers\Api\AuthController;

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return response()->json(['message' => 'Test']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin Dashboard - only for admins
    Route::get('/admin/dashboard', function () {
        return response()->json(['message' => 'Admin Dashboard']);
    })->middleware('role:admin');

    // Participant Dashboard - only for participants
    Route::get('/participant/dashboard', [PublicEventController::class, 'index'])->middleware('role:participant');

    // Admin routes
    Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::get('/stats', [AdminController::class, 'getStats']);
        Route::apiResource('users', UserController::class); // CRUD for users (participants)
        Route::apiResource('events', EventController::class); // CRUD for events
        Route::get('/public-events', [PublicEventController::class, 'index']);
        Route::get('/public-events/{id}', [PublicEventController::class, 'show']);

        // Added routes
        Route::get('/events', [EventController::class, 'index']); // List all events for admin
        Route::post('/add-event', [EventController::class, 'store']); // Create new event
        Route::get('/edit-event/{id}', [EventController::class, 'show']); // Show event for editing
        Route::put('/edit-event/{id}', [EventController::class, 'update']); // Update event
        Route::get('/users', [UserController::class, 'index']); // List all users
        Route::post('/add-user', [UserController::class, 'store']); // Create new user
    });

    // Participant-specific routes
    Route::get('/participant-events', [PublicEventController::class, 'participantEvents'])->middleware('role:participant');
    Route::get('/all-events', [PublicEventController::class, 'allEvents'])->middleware('auth:sanctum');
    Route::get('/events', [PublicEventController::class, 'index']); // Public or participant-accessible events
});
