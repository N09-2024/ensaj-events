<?php
// app/Http/Controllers/Api/AdminController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function getStats(Request $request)
    {
        // Total users (excluding admins, assuming admins have role 'admin')
        $users = User::where('role', '!=', 'admin')->count();

        // Total active events (events with end_date >= today or no end_date)
        $events = Event::count();

        // New registrations in the last 7 days (excluding admins)
        $newRegistrations = User::where('role', '!=', 'admin')
            ->where('created_at', '>=', now()->subDays(7))
            ->count();

        return response()->json([
            'users' => $users,
            'events' => $events,
            'newRegistrations' => $newRegistrations,
        ], 200);
    }

    //---------------------//
    // Ajoutez ces méthodes à AdminController
public function getUsers()
{
    $users = User::where('role', 'participant')->get();
    return response()->json($users);
}

public function createUser(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 'participant',
    ]);

    return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
}

public function deleteUser(User $user)
{
    if ($user->role === 'admin') {
        return response()->json(['message' => 'Cannot delete admin users'], 403);
    }

    $user->delete();
    return response()->json(['message' => 'User deleted successfully']);
}
}
