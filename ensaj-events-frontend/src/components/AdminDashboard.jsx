import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        users: 0,
        events: 0,
        newRegistrations: 0
    });
    const [error, setError] = useState('');
    const adminName = localStorage.getItem('userName') || 'Administrateur';

    useEffect(() => {
        // Debug localStorage to verify userName
        console.log('localStorage contents:', {
            token: localStorage.getItem('token'),
            userName: localStorage.getItem('userName'),
            userRole: localStorage.getItem('userRole')
        });

        // Prevent access if not logged in
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('No token found, redirecting to login');
            navigate('/login');
            return;
        }

        // Fetch stats from /api/admin/stats
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setError('Échec du chargement des statistiques.');
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.clear();
                    navigate('/login');
                }
            }
        };

        fetchStats();
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

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3 className="admin-name">{adminName}</h3>
                    <p className="admin-role">Administrateur Principal</p>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                           <button
    className="nav-link"
    onClick={() => navigate('/admin/users')}
>
    Gestion des Utilisateurs
</button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => navigate('/admin/add-event')}
                            >
                                Ajouter un événement
                            </button>
                        </li>
                        <li>
                            <button
                                className="nav-link"
                                onClick={() => navigate('/admin/events')}
                            >
                                Tous les événements
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main-content">
                <div className="content-header">
                    <h1 className="dashboard-title">Tableau de bord Admin</h1>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Déconnexion
                    </button>
                </div>
                <div className="content-body">
                    <p>Bienvenue, {adminName} ! Voici un aperçu de l'activité de la plateforme.</p>
                    {error && <div className="error-message">{error}</div>}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{stats.users}</div>
                            <div className="stat-label">Utilisateurs inscrits</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{stats.events}</div>
                            <div className="stat-label">Événements actifs</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{stats.newRegistrations}</div>
                            <div className="stat-label">Inscriptions (7 jours)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
