import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/AddUser.css';

function AddUser() {
  const navigate = useNavigate();

  // État du formulaire avec rôle et confirmation du mot de passe
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.role) {
      setError('Le rôle est obligatoire');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Le mot de passe doit contenir au moins 6 caractères avec des lettres et des chiffres.');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      console.log("Données envoyées :", formData);

      const response = await api.post('/admin/users', {
        ...formData
      });

      setSuccess('Utilisateur créé avec succès !');
      setTimeout(() => navigate('/admin/users'), 1500);
    } catch (error) {
      console.error('Erreur lors de la création:', error);

      if (error.response?.status === 422) {
        const errors = error.response.data.errors;

        if (errors.name) {
          setError(errors.name[0]);
        } else if (errors.email) {
          setError(errors.email[0]);
        } else if (errors.password) {
          setError(errors.password[0]);
        } else if (errors.role) {
          setError(errors.role[0]);
        } else {
          setError('Erreur de validation inconnue');
        }
      } else {
        setError(error.response?.data?.message || "Erreur serveur");
      }
    }
  };

  return (
    <div className="add-user-container">
      <h2>Ajouter un Nouvel Utilisateur</h2>

      <form onSubmit={handleSubmit} className="user-form">
        {/* Nom */}
        <div className="form-group">
          <label>Nom :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mot de passe */}
        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        {/* Confirmer mot de passe */}
        <div className="form-group">
          <label>Confirmer le mot de passe :</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        {/* Rôle */}
        <div className="form-group">
          <label>Rôle :</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un rôle</option>
            <option value="admin">Admin</option>
            <option value="participant">Participant</option>
          </select>
        </div>

        {/* Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Boutons */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Créer l'Utilisateur
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="cancel-btn"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;