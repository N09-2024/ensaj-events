import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = 'http://localhost:8000';
  const navigate = useNavigate();

  // Récupérer l'utilisateur connecté
  const userId = localStorage.getItem('userId') || 'unknown_user';
  const storageKey = `participantEvents_${userId}`;

  // Récupérer les événements déjà participés pour CET utilisateur
  const getParticipantEvents = () => {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  };

  // Gérer le clic sur "Participer"
  const handleParticipate = (event) => {
    const storedEvents = getParticipantEvents();
    const alreadyAdded = storedEvents.some(e => e.id === event.id);

    if (!alreadyAdded) {
      const updatedEvents = [...storedEvents, event];
      localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
    }

    navigate('/participant/events');
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEvents(response.data);
      } catch (err) {
        setError("Impossible de charger les événements.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Chargement des événements...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="all-events-container">
      {/* Header */}
      <header>
        <h1>Découvrez nos événements</h1>
        <p>Choisissez ceux qui vous intéressent et participez à l'expérience !</p>
      </header>

      {/* Bouton Retour */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← Retour
      </button>

      {/* Liste des événements */}
      <div className="events-grid">
        {events.map((event) => {
          const storedEvents = getParticipantEvents();
          const alreadyAdded = storedEvents.some(e => e.id === event.id);

          return (
            <div key={event.id} className="event-card">
              <img
                src={event.image ? `${backendUrl}/storage/${event.image}` : 'https://picsum.photos/id/10/400/250 '}
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

                {/* Affichage conditionnel du bouton ou état visuel */}
                {alreadyAdded ? (
                  <button className="participated-button" disabled>
                    ✔ Déjà ajouté
                  </button>
                ) : (
                  <button
                    className="participate-button"
                    onClick={() => handleParticipate(event)}
                  >
                    Participer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}