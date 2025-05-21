import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/AddEvent.css';

function AddEvent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        capacity: '',
        image: null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        if (!token || userRole !== 'admin') {
            console.warn('No token or incorrect role, redirecting to login');
            localStorage.clear();
            navigate('/login');
            return;
        }

        // Fetch CSRF token
        const fetchCsrfToken = async () => {
            try {
                await api.get('/sanctum/csrf-cookie', { withCredentials: true });
                console.log('CSRF token fetched successfully');
            } catch (err) {
                console.error('Error fetching CSRF token:', err);
            }
        };

        fetchCsrfToken();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== '') {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await api.post('/admin/events', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            setSuccess(response.data.message);
            setTimeout(() => navigate('/admin/events'), 2000);
        } catch (error) {
            console.error('Error creating event:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.clear();
                navigate('/login');
            } else if (error.response?.status === 419) {
                setError('CSRF token mismatch. Please refresh the page and try again.');
            } else if (error.response?.data?.errors) {
                setError(Object.values(error.response.data.errors).flat().join(', '));
            } else {
                setError('Échec de la création de l\'événement: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <div className="add-event">
            <h2>Ajouter un événement</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Titre</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date de début</label>
                    <input
                        type="datetime-local"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                        min="2025-05-20T12:33"
                    />
                </div>
                <div className="form-group">
                    <label>Date de fin</label>
                    <input
                        type="datetime-local"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        min={formData.start_date || "2025-05-20T12:33"}
                    />
                </div>
                <div className="form-group">
                    <label>Lieu</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Capacité</label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
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
                    Créer l'événement
                </button>
            </form>
        </div>
    );
}

export default AddEvent;