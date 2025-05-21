import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Events.css';

function Events() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    // L'URL de base du backend est déjà définie dans api.js, mais la conserver pour la construction d'URL d'images spécifiques n'est pas une mauvaise idée.
    // Cependant, il est plus propre de passer par la baseURL de l'instance Axios si possible.
    // Si votre api.js est configuré avec baseURL, vous n'aurez pas besoin de cette variable ici.
    // Pour l'instant, je la laisse pour la clarté.
    const backendUrl = 'http://localhost:8000'; 

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');

        if (!token || userRole !== 'admin') {
            console.warn('No token or incorrect role, redirecting to login');
            localStorage.clear();
            navigate('/login');
            return;
        }

        const fetchEvents = async () => {
            try {
                // L'API pour récupérer les événements des admins est /admin/events
                const response = await api.get('/admin/events');
                console.log('Events response:', response.data);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                });
                setError('Échec du chargement des événements: ' + (error.response?.data?.message || error.message));
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.clear();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [navigate]); // navigate est une dépendance de useEffect

    const handleDelete = async (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cet événement ?')) {
            try {
                await api.delete(`/admin/events/${id}`);
                // Filtrer l'événement supprimé du state pour mettre à jour l'UI
                setEvents(events.filter((event) => event.id !== id));
            } catch (error) {
                console.error('Error deleting event:', error);
                setError('Échec de la suppression de l\'événement: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleBack = () => {
        navigate('/admin-dashboard');
    };

    return (
        <div className="events">
            <h2>Tous les événements</h2>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <p>Chargement...</p>
            ) : events.length === 0 ? (
                <p>Aucun événement disponible.</p>
            ) : (
                <div className="events-list">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p><strong>Date de début:</strong> {new Date(event.start_date).toLocaleString('fr-FR')}</p>
                            <p><strong>Date de fin:</strong> {event.end_date ? new Date(event.end_date).toLocaleString('fr-FR') : 'N/A'}</p>
                            <p><strong>Lieu:</strong> {event.location}</p>
                            {event.image && (
                                <img
                                    // Correction de l'URL de l'image
                                    // Le chemin de l'image stocké par Laravel est 'events/nom_fichier.jpg'
                                    // Le lien symbolique storage:link rend 'storage/events/nom_fichier.jpg' public.
                                    src={`${backendUrl}/storage/${event.image}`} 
                                    alt={event.title}
                                    className="event-image"
                                    onError={(e) => {
                                        console.error(`Failed to load image for event ID ${event.id}: ${backendUrl}/storage/${event.image}`);
                                        e.target.onerror = null; // Empêche une boucle d'erreurs
                                        e.target.src = 'https://via.placeholder.com/60?text=Error'; // Fallback
                                    }}
                                />
                            )}
                            <p><strong>Nombre d'invités:</strong> {event.capacity || 'Non spécifié'}</p>
                            <div className="event-actions">
                                <button
                                    onClick={() => navigate(`/admin/edit-event/${event.id}`)}
                                    className="edit-button"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    className="delete-button"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="events-footer">
                <button onClick={handleBack} className="back-button">
                    Retour
                </button>
            </div>
        </div>
    );
}

export default Events;