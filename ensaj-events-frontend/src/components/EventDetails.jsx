import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/EventDetails.css';

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Ensure REACT_APP_API_URL is defined in your .env file (e.g., .env.development)
    const backendBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // Fallback

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('EventDetails: No token found, redirecting to login.');
            navigate('/login');
            return;
        }

        const fetchEvent = async () => {
            setLoading(true); // Always set loading to true when starting fetch
            setError(''); // Clear previous errors
            try {
                console.log(`EventDetails: Fetching event with ID: ${id}`);
                const response = await api.get(`/events/${id}`); // Assuming /events/{id} is accessible
                setEvent(response.data);
                console.log('EventDetails: Event data fetched:', response.data);
            } catch (err) {
                console.error('EventDetails: Error fetching event:', err);
                let errorMessage = 'Impossible de charger les détails de l\'événement.';
                if (err.response) {
                    if (err.response.status === 401 || err.response.status === 403) {
                        errorMessage = 'Votre session a expiré ou vous n\'êtes pas autorisé. Veuillez vous reconnecter.';
                        localStorage.clear();
                        navigate('/login');
                    } else if (err.response.status === 404) {
                        errorMessage = 'Événement non trouvé.';
                    } else if (err.response.data && err.response.data.message) {
                        errorMessage = `Erreur: ${err.response.data.message}`;
                    } else {
                        errorMessage = `Erreur serveur: ${err.response.status}`;
                    }
                } else if (err.request) {
                    errorMessage = 'Aucune réponse du serveur. Vérifiez votre connexion.';
                } else {
                    errorMessage = `Erreur de requête: ${err.message}`;
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, navigate, backendBaseUrl]); // Added backendBaseUrl to dependencies

    const handleBack = () => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            navigate('/admin/events'); // Assuming this is the correct path for admin events list
        } else {
            navigate('/participant-dashboard'); // Participant dashboard path
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            console.error('EventDetails: Error formatting date:', dateString, e);
            return 'Date invalide';
        }
    };

    // Construct image URL (assuming Laravel stores 'events_images/...' in DB)
    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return '/images/event-placeholder.jpg'; // Default placeholder if no image
        }
        // Assuming imagePath from backend is something like 'events_images/...'
        // The Laravel public/storage symlink makes it accessible via /storage/
        return `${backendBaseUrl}/storage/${imagePath}`;
    };

    return (
        <div className="event-details-page">
            <div className="event-details-header">
                <button className="back-button" onClick={handleBack}>
                    ← Retour
                </button>
                <h1>Détails de l'événement</h1>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement des détails de l'événement...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button className="back-to-events" onClick={handleBack}>
                        Retourner aux événements
                    </button>
                </div>
            ) : event ? (
                <div className="event-details-container">
                    <div className="event-details-content">
                        <div className="event-header">
                            <h2>{event.title}</h2>
                        </div>

                        <div className="event-details-grid">
                            <div className="event-image-container">
                                <img
                                    src={getImageUrl(event.image)}
                                    alt={event.title}
                                    className="event-full-image"
                                    onError={(e) => {
                                        console.error(`EventDetails: Failed to load image from ${getImageUrl(event.image)}`);
                                        e.target.onerror = null; // Prevent infinite loop if fallback also fails
                                        e.target.src = '/images/event-placeholder.jpg'; // Fallback to a local placeholder
                                    }}
                                />
                            </div>

                            <div className="event-info">
                                <div className="info-item">
                                    <div className="info-label">Date de début:</div>
                                    <div className="info-value">{formatDate(event.start_date)}</div>
                                </div>

                                {event.end_date && (
                                    <div className="info-item">
                                        <div className="info-label">Date de fin:</div>
                                        <div className="info-value">{formatDate(event.end_date)}</div>
                                    </div>
                                )}

                                <div className="info-item">
                                    <div className="info-label">Lieu:</div>
                                    <div className="info-value">{event.location}</div>
                                </div>

                                {event.capacity !== null && event.capacity !== undefined && ( // Check for null/undefined capacity
                                    <div className="info-item">
                                        <div className="info-label">Capacité:</div>
                                        <div className="info-value">{event.capacity} personnes</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="event-description-section">
                            <h3>Description</h3>
                            <div className="event-description-content">
                                {event.description && event.description.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                                {!event.description && <p>Aucune description disponible.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default EventDetails;