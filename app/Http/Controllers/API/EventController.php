<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str; // Assurez-vous que cette ligne est présente

use Illuminate\Support\Carbon; // Assurez-vous que cette ligne est présente

class EventController extends Controller
{
    public function index()
    {
        // Récupère tous les événements visibles (ce qui inclut les événements sans date de fin ou dont la date de fin n'est pas encore passée)
        $events = Event::where('end_date', '>=', now())
                       ->orWhereNull('end_date')
                       ->get();
        
        return response()->json($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:3', // Minimum 3 characters
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date', // Correction: after_or_equal pour permettre des événements d'un jour
            'location' => 'required|string',
            'capacity' => 'nullable|integer|min:0',
            'image' => 'nullable|image|max:2048', // Max 2MB
        ]);

        $data = $request->all();

        // Parse dates to ensure correct format
        $data['start_date'] = Carbon::parse($request->start_date)->toDateTimeString();
        if ($request->end_date) {
            $data['end_date'] = Carbon::parse($request->end_date)->toDateTimeString();
        }

        if ($request->hasFile('image')) {
            // Le chemin sera 'events/nom_unique_du_fichier.jpg' et sera stocké dans storage/app/public/events
            $imagePath = $request->file('image')->store('events', 'public'); 
            $data['image'] = $imagePath;
        }

        $event = Event::create($data);

        return response()->json([
            'message' => 'Événement créé avec succès',
            'event' => $event,
        ], 201);
    }
    
    public function show(Event $event)
    {
        return response()->json($event);
    }

    public function update(Request $request, Event $event)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date', // Correction: nullable et after_or_equal
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'capacity' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();

        // Parse dates to ensure correct format for update
        $data['start_date'] = Carbon::parse($request->start_date)->toDateTimeString();
        if ($request->end_date) {
            $data['end_date'] = Carbon::parse($request->end_date)->toDateTimeString();
        } else {
            $data['end_date'] = null; // Assurez-vous que end_date peut être nul si non fourni
        }

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($event->image && Storage::disk('public')->exists($event->image)) {
                Storage::disk('public')->delete($event->image);
            }
            // Générer un nom de fichier unique et stocker l'image
            $originalName = $request->file('image')->getClientOriginalName();
            $extension = $request->file('image')->getClientOriginalExtension();
            // Utiliser Str::random ou un hash pour des noms plus robustes si besoin
            $uniqueName = Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '_' . time() . '_' . uniqid() . '.' . $extension;
            // Le chemin sera 'events/nom_unique.jpg' stocké dans storage/app/public/events
            $data['image'] = $request->file('image')->storeAs('events', $uniqueName, 'public');
        }

        $event->update($data);
        return response()->json(['message' => 'Événement mis à jour avec succès', 'event' => $event]);
    }

    public function destroy(Event $event)
    {
        // CORRECTION MAJEURE ICI : Utiliser 'public' comme nom de disque.
        // C'est le disque par défaut configuré dans config/filesystems.php pour pointer vers storage_path('app/public').
        if ($event->image) {
            // Vérifiez si le fichier existe avant de tenter de le supprimer
            if (Storage::disk('public')->exists($event->image)) {
                Storage::disk('public')->delete($event->image);
            } else {
                // Log un avertissement si le fichier n'est pas trouvé (utile pour le débogage)
                \Log::warning("Image not found for deletion: {$event->image}");
            }
        }
        $event->delete();
        return response()->json(['message' => 'Événement supprimé avec succès']);
    }
}