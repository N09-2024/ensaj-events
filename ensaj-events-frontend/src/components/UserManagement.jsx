import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/UserManagement.css';

function UserManagement() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
    });
    const [formMode, setFormMode] = useState('create'); // 'create' ou 'edit'

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Important: ajoutez des logs pour le débogage
            console.log('Fetching users...');
            const response = await api.get('/users');
            console.log('Users data received:', response.data);
            setUsers(response.data);
            setError('');
        } catch (err) {
            console.error('Erreur lors de la récupération des utilisateurs:', err);
            // Afficher plus de détails sur l'erreur pour le débogage
            if (err.response) {
                console.error('Response status:', err.response.status);
                console.error('Response data:', err.response.data);
            }
            setError('Impossible de charger la liste des utilisateurs.');
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.clear();
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const resetForm = () => {
        setCurrentUser({
            id: null,
            name: '',
            email: '',
            password: '',
        });
    };

    const openCreateModal = () => {
        resetForm();
        setFormMode('create');
        setShowModal(true);
    };

    const openEditModal = (user) => {
        setCurrentUser({
            id: user.id,
            name: user.name,
            email: user.email,
            password: '', // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
        });
        setFormMode('edit');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting form with data:', currentUser);
            if (formMode === 'create') {
                const response = await api.post('/users', currentUser);
                console.log('User created:', response.data);
                setError('');
                closeModal();
                fetchUsers();
            } else {
                // Pour la mise à jour, on n'envoie le mot de passe que s'il a été modifié
                const userData = { ...currentUser };
                if (!userData.password) {
                    delete userData.password;
                }
                const response = await api.put(`/users/${currentUser.id}`, userData);
                console.log('User updated:', response.data);
                setError('');
                closeModal();
                fetchUsers();
            }
        } catch (err) {
            console.error('Erreur lors de la sauvegarde:', err);
            if (err.response) {
                console.error('Response status:', err.response.status);
                console.error('Response data:', err.response.data);
            }
            setError(
                err.response?.data?.errors 
                ? 'Erreur: ' + Object.values(err.response.data.errors).join(', ')
                : 'Une erreur est survenue lors de la sauvegarde.'
            );
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            return;
        }

        try {
            console.log('Deleting user with ID:', userId);
            const response = await api.delete(`/users/${userId}`);
            console.log('Delete response:', response.data);
            fetchUsers();
        } catch (err) {
            console.error('Erreur lors de la suppression:', err);
            if (err.response) {
                console.error('Response status:', err.response.status);
                console.error('Response data:', err.response.data);
            }
            setError('Impossible de supprimer cet utilisateur.');
        }
    };

    const handleBack = () => {
        navigate('/admin-dashboard'); // Corrigé pour correspondre à votre route
    };

    return (
        <div className="user-management">
            <div className="header">
                <button onClick={handleBack} className="back-button">
                    Retour au tableau de bord
                </button>
                <h1>Gestion des utilisateurs</h1>
                <button onClick={openCreateModal} className="add-button">
                    Ajouter un utilisateur
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Chargement des utilisateurs...</div>
            ) : (
                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="no-users">
                                        Aucun utilisateur trouvé. Créez votre premier utilisateur !
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="actions">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="edit-button"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="delete-button"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>{formMode === 'create' ? 'Ajouter un utilisateur' : 'Modifier un utilisateur'}</h2>
                            <button onClick={closeModal} className="close-button">
                                &times;
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nom</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={currentUser.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={currentUser.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    {formMode === 'create' ? 'Mot de passe' : 'Nouveau mot de passe (laisser vide pour ne pas changer)'}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={currentUser.password}
                                    onChange={handleInputChange}
                                    required={formMode === 'create'}
                                />
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={closeModal} className="cancel-button">
                                    Annuler
                                </button>
                                <button type="submit" className="submit-button">
                                    {formMode === 'create' ? 'Créer' : 'Mettre à jour'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;