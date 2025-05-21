import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import '../styles/AddEvent.css';

function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [event, setEvent] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        capacity: '',
        image: null,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!token || userRole !== 'admin') {
            console.warn('No token or incorrect role, redirecting to login');
            localStorage.clear();
            navigate('/login');
            return;
        }

        const fetchCsrfToken = async () => {
            try {
                await api.get('/sanctum/csrf-cookie', { withCredentials: true });
                console.log('CSRF token fetched successfully');
            } catch (err) {
                console.error('Error fetching CSRF token:', err);
            }
        };

        const fetchEvent = async () => {
            try {
                await fetchCsrfToken();
                const response = await api.get(`/admin/events/${id}`);
                const data = response.data;
                setEvent({
                    title: data.title,
                    description: data.description,
                    start_date: data.start_date ? new Date(data.start_date).toISOString().slice(0, 16) : '',
                    end_date: data.end_date ? new Date(data.end_date).toISOString().slice(0, 16) : '',
                    location: data.location,
                    capacity: data.capacity || '',
                    image: null,
                });
            } catch (error) {
                console.error('Error fetching event:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                });
                setError('Échec du chargement de l\'événement: ' + (error.response?.data?.message || error.message));
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.clear();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setEvent({
            ...event,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const data = new FormData();
        data.append('_method', 'PUT'); // Laravel workaround for multipart/form-data
        Object.keys(event).forEach((key) => {
            if (event[key] !== null && event[key] !== '') {
                data.append(key, event[key]);
            }
        });

        try {
            await api.post(`/admin/events/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            navigate('/admin/events');
        } catch (error) {
            console.error('Error updating event:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            if (error.response?.status === 405) {
                setError('Méthode non autorisée. Veuillez vérifier la configuration de la route.');
            } else if (error.response?.data?.errors) {
                setError(Object.values(error.response.data.errors).flat().join(', '));
            } else {
                setError('Échec de la modification de l\'événement: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="add-event">
            <h2>Modifier l'événement</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titre</label>
                    <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de début</label>
                    <input
                        type="datetime-local"
                        name="start_date"
                        value={event.start_date}
                        onChange={handleChange}
                        required
                        min="2025-05-20T12:42"
                    />
                </div>
                <div className="form-group">
                    <label>Date de fin</label>
                    <input
                        type="datetime-local"
                        name="end_date"
                        value={event.end_date}
                        onChange={handleChange}
                        min={event.start_date || "2025-05-20T12:42"}
                    />
                </div>
                <div className="form-group">
                    <label>Lieu</label>
                    <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Capacité</label>
                    <input
                        type="number"
                        name="capacity"
                        value={event.capacity}
                        onChange={handleChange}
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Mettre à jour
                </button>
            </form>
        </div>
    );
}

export default EditEvent;