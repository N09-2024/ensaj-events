<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon; // Ensure Carbon is imported

class PublicEventController extends Controller
{
    public function index()
    {
        // This endpoint returns all upcoming/ongoing public events.
        // It's suitable for 'Explore Events' or general event listings.
        $events = Event::where(function ($query) {
            $query->where('end_date', '>=', now())
                  ->orWhereNull('end_date'); // Include events with no end date
        })
        ->orderBy('start_date', 'asc') // Order for consistency
        ->get();

        return response()->json($events);
    }

    public function show(Event $event)
    {
        // This returns a single public event.
        // You might add a check here if the event is active/public if security is a concern.
        return response()->json($event);
    }
}