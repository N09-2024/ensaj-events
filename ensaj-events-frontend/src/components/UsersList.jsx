import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/UserList.css';

function UsersList() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load users');
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate('/login');
                }
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleDelete = async (userId) => {
        try {
            await api.delete(`/admin/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user');
        }
    };

    return (
        <div className="users-list-container">
            <h2>Gestion des Utilisateurs</h2>
            <button 
                onClick={() => navigate('/admin/add-user')}
                className="add-user-btn"
            >
                Ajouter un Utilisateur
            </button>
            
            {error && <div className="error-message">{error}</div>}
            
            <table className="users-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(user.id)}
                                    className="delete-btn"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;