import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { getCsrfToken } from '../services/api';
import '../styles/LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await getCsrfToken();
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userRole', response.data.user.role);

            if (response.data.user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/participant-dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Échec de la connexion. Vérifiez vos identifiants.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-form-panel">
                    <div className="site-logo">ENSAJ <span>Events</span></div>
                    <div className="login-form-container">
                        <div className="login-header">
                            <h2 className="login-title">Bienvenue</h2>
                            <p className="login-subtitle">Connectez-vous à votre compte</p>
                        </div>
                        {error && <div className="login-error">{error}</div>}
                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`login-button ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                <span className="button-text">{loading ? 'Connexion en cours...' : 'Se connecter'}</span>
                                <span className="button-loader"></span>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="login-illustration">
                    <div className="illustration-content">
                        <h2>ENSAJ Events</h2>
                        <p>Plateforme de gestion des événements de l'École Nationale des Sciences Appliquées d'El Jadida</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
