import React, { useEffect, useState } from 'react';
import '../styles/AllEvents.css';
import api from '../services/api';

// Fonction utilitaire pour formater la date ET l'heure
const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit' };

  const formattedDate = date.toLocaleDateString('fr-FR', optionsDate);
  const formattedTime = date.toLocaleTimeString('fr-FR', optionsTime);

  return `${formattedDate} à ${formattedTime}`;
};

export default function ParticipantEventPage() {
  const [participantEvents, setParticipantEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupérer l'ID de l'utilisateur connecté
  const userId = localStorage.getItem('userId') || 'unknown_user';
  const storageKey = `participantEvents_${userId}`;

  // Charger tous les événements depuis le backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Filtrer les événements encore valides
        const validEvents = storedEvents.filter(stored =>
          response.data.some(event => event.id === stored.id)
        );

        localStorage.setItem(storageKey, JSON.stringify(validEvents));
        setParticipantEvents(validEvents);
      } catch (err) {
        console.error("Erreur lors du chargement des événements :", err);
        const storedEvents = JSON.parse(localStorage.getItem(storageKey)) || [];
        setParticipantEvents(storedEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [storageKey]);

  // Fonction pour retirer un événement
  const handleRemove = (eventId) => {
    const updatedList = participantEvents.filter(e => e.id !== eventId);
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
    setParticipantEvents(updatedList);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="all-events-container">
      {/* Header */}
      <header>
        <h1>Mes Événements</h1>
        <p>Liste des événements auxquels vous avez choisi de participer.</p>
      </header>

      <button className="back-button" onClick={() => window.history.back()}>
        ← Retour
      </button>

      <div className="events-grid">
        {participantEvents.length > 0 ? (
          participantEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.image ? `http://localhost:8000/storage/${event.image}` : 'https://picsum.photos/id/10/400/250 '}
                alt={event.title || 'Événement'}
                className="event-image"
              />
              <div className="event-details">
                <h3 className="event-title">{event.title || 'Sans titre'}</h3>
                <p className="event-description">
                  {event.description ||
                    "Aucune description n'est disponible pour cet événement."}
                </p>
                <p className="event-date">
                  {formatDateTime(event.start_date)} - {formatDateTime(event.end_date)}
                </p>
                <p className="event-location">
                  <span className="location-pin">📍</span> {event.location || 'ensaj'}
                </p>

                {/* Bouton Retirer */}
                <button
                  className="remove-button"
                  onClick={() => handleRemove(event.id)}
                >
                  ❌ Retirer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun événement sélectionné pour le moment.</p>
        )}
      </div>
    </div>
  );
}