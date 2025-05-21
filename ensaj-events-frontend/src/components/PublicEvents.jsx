import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Events.css';

function PublicEvents() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get('/public-events');
                setEvents(response.data);
            } catch (err) {
                console.error('Erreur lors de la récupération des événements', err);
                setError('Impossible de charger les événements.');
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="events">
            <h2>Liste des événements</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="events-list">
                {events.length === 0 ? (
                    <p>Aucun événement disponible.</p>
                ) : (
                    events.map(event => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Début :</strong> {new Date(event.start_date).toLocaleString()}</p>
                            <p><strong>Fin :</strong> {new Date(event.end_date).toLocaleString()}</p>
                            <p><strong>Lieu :</strong> {event.location}</p>
                            {event.image && (
                                <img
                                    src={`http://your-api-url/storage/${event.image}`}
                                    alt={event.title}
                                    className="event-image"
                                />
                            )}
                            <p><strong>Capacité :</strong> {event.capacity}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PublicEvents;
