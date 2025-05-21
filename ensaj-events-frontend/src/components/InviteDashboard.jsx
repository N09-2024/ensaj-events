import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/InviteDashboard.css';

function InviteDashboard() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const inviteName = localStorage.getItem('userName') || 'Invité';

    useEffect(() => {
        // Vérifier l'authentification
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Récupérer les événements
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await api.get('/events');
                setEvents(response.data);
                setError('');
            } catch (err) {
                console.error('Erreur lors de la récupération des événements:', err);
                setError('Impossible de charger les événements.');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.clear();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userRole');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Formater la date pour l'affichage
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="invite-dashboard">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3 className="invite-name">{inviteName}</h3>
                    <p className="invite-role">Participant</p>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <button className="nav-link active">
                                Événements actuels
                            </button>
                        </li>
                        <li>
                            <button className="nav-link">
                                Mes inscriptions
                            </button>
                        </li>
                        <li>
                            <button className="nav-link">
                                Mon profil
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="main-content">
                <div className="content-header">
                    <h1 className="dashboard-title">Liste des événements</h1>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Déconnexion
                    </button>
                </div>

                <div className="content-body">
                    <p>Bienvenue, {inviteName} ! Voici les événements à venir.</p>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    {loading ? (
                        <div className="loading">Chargement des événements...</div>
                    ) : (
                        <div className="events-grid">
                            {events.length === 0 ? (
                                <div className="no-events">
                                    Aucun événement disponible pour le moment.
                                </div>
                            ) : (
                                events.map((event) => (
                                    <div key={event.id} className="event-card">
                                        {event.image ? (
                                            <div className="event-image">
                                                <img src={`${process.env.REACT_APP_API_URL}/storage/${event.image}`} alt={event.title} />
                                            </div>
                                        ) : (
                                            <div className="event-image-placeholder">
                                                <span>Pas d'image</span>
                                            </div>
                                        )}
                                        <div className="event-content">
                                            <h3 className="event-title">{event.title}</h3>
                                            <div className="event-info">
                                                <p className="event-date">
                                                    <strong>Date:</strong> {formatDate(event.start_date)} - {formatDate(event.end_date)}
                                                </p>
                                                <p className="event-location">
                                                    <strong>Lieu:</strong> {event.location}
                                                </p>
                                            </div>
                                            <p className="event-description">
                                                {event.description.length > 100
                                                    ? `${event.description.substring(0, 100)}...`
                                                    : event.description}
                                            </p>
                                            <button className="view-details-button">
                                                Voir les détails
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default InviteDashboard;
