import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/ParticipantDashboard.css';

export default function ParticipantDashboard() {
  const navigate = useNavigate();

  // State
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // LocalStorage Data
  const participantName = localStorage.getItem('userName') || 'Participant User';
  const backendUrl = 'http://localhost:8000';

  // Refs
  const fetchEventsRef = useRef(null);

  // Load Events
  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found, redirecting to login');
      navigate('/login');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/participant/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!Array.isArray(response.data)) {
        setEvents([]);
        setFilteredEvents([]);
        setError('Données d’événements invalides reçues du serveur.');
      } else {
        setEvents(response.data);
        setFilteredEvents(response.data);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      let errorMessage = 'Échec du chargement des événements.';
      if (err.response?.status === 401 || err.response?.status === 403) {
        errorMessage = 'Votre session a expiré. Veuillez vous reconnecter.';
        localStorage.clear();
        navigate('/login');
      } else if (err.response?.data?.message) {
        errorMessage = `Erreur: ${err.response.data.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Effects
  useEffect(() => {
    fetchEventsRef.current = loadEvents;
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    const results = events.filter((event) => {
      if (!event) return false;
      const title = event.title || '';
      const description = event.description || '';
      const location = event.location || '';
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredEvents(results);
  }, [searchTerm, events]);

  // Handlers
  const handleLogout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  const handleNavigate = (path, tab) => {
    setActiveTab(tab);
    navigate(path);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'Date invalide';
    }
  };

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => (new Date(year, month, 1).getDay() + 6) % 7;

  // ✨ Fonction mise à jour pour afficher tous les jours concernés par les événements
  const renderCalendarDays = () => {
    const days = [];
    const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-start-${i}`} className="day other-month"></div>);
    }

    const eventDays = [];

    events.forEach((event) => {
      if (!event.start_date) return;

      const startDate = new Date(event.start_date);
      const endDate = event.end_date ? new Date(event.end_date) : new Date(event.start_date);

      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      const isSameMonthStart =
        startYear === currentYear && startMonth === currentMonth;

      const isSameMonthEnd =
        endYear === currentYear && endMonth === currentMonth;

      let dayStart = 1;
      let dayEnd = daysInMonth;

      if (isSameMonthStart && isSameMonthEnd) {
        dayStart = startDay;
        dayEnd = endDay;
      } else if (isSameMonthStart && !isSameMonthEnd) {
        dayStart = startDay;
        dayEnd = daysInMonth;
      } else if (!isSameMonthStart && isSameMonthEnd) {
        dayStart = 1;
        dayEnd = endDay;
      } else {
        return; // hors du mois actuel
      }

      for (let d = dayStart; d <= dayEnd; d++) {
        eventDays.push(d);
      }
    });

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const today = new Date('2025-05-21'); // Tu peux utiliser new Date() si nécessaire
      const isToday = date.toDateString() === today.toDateString();

      const classes = ['day'];
      if (isToday) classes.push('today');
      if (eventDays.includes(i)) classes.push('has-event');

      days.push(
        <div key={`day-${i}`} className={classes.join(' ')}>
          {i}
          {eventDays.includes(i) && <span className="event-indicator">•</span>}
        </div>
      );
    }

    const remainingCells = 42 - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="day other-month"></div>);
    }

    return days;
  };

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const getMonthName = (monthIndex) =>
    new Date(currentYear, monthIndex).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const upcomingEvents = events.filter((event) => {
    if (!event || (!event.start_date && !event.end_date)) return false;
    const eventDate = new Date(event.end_date || event.start_date);
    return eventDate >= new Date();
  });

  const pastEvents = events.filter((event) => {
    if (!event || (!event.start_date && !event.end_date)) return false;
    const eventDate = new Date(event.end_date || event.start_date);
    return eventDate < new Date();
  });

  // Récupérer l'utilisateur connecté
  const userId = localStorage.getItem('userId') || 'unknown_user';
  const storageKey = `participantEvents_${userId}`;

  const getParticipantEvents = () => {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  };

  const handleParticipate = (event) => {
    const storedEvents = getParticipantEvents();
    const alreadyAdded = storedEvents.some(e => e.id === event.id);

    if (!alreadyAdded) {
      const updatedEvents = [...storedEvents, event];
      localStorage.setItem(storageKey, JSON.stringify(updatedEvents));
    }

    navigate('/participant/events');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h3>Chargement des événements...</h3>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Tableau de Bord</h1>
        <div className="header-actions">
          <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <div className="logo-container">
              <span className="logo">✨</span>
              <span className="logo-text">ENSAJ Event</span>
            </div>
            <button
              className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`}
              onClick={() => handleNavigate('/participant-dashboard', 'Dashboard')}
            >
              📊 Tableau de Bord
            </button>
            <button
              className={`nav-item ${activeTab === 'Events' ? 'active' : ''}`}
              onClick={() => handleNavigate('/participant/events', 'Events')}
            >
              🎟️ Mes Événements
            </button>
          </nav>
        </aside>

        {/* Main Area */}
        <main className="dashboard-main">
          <div className="content-grid">
            {/* Welcome Card */}
            <div className="welcome-card">
              <h2 className="welcome-title">Bienvenue, {participantName}!</h2>
              <p className="welcome-text">
                Découvrez et gérez vos événements. Nous avons des événements passionnants qui vous attendent !
              </p>
              <button className="explore-btn" onClick={() => navigate('/all-events')}>
                ✨ Explorer les événements
              </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
              <div className="stat-card upcoming">
                <span className="stat-icon">🌟</span>
                <div>
                  <h3 className="stat-label">Événements à Venir</h3>
                  <span className="stat-value">{loading ? '...' : upcomingEvents.length}</span>
                </div>
              </div>
              <div className="stat-card past">
                <span className="stat-icon">🗓️</span>
                <div>
                  <h3 className="stat-label">Événements Passés</h3>
                  <span className="stat-value">{loading ? '...' : pastEvents.length}</span>
                </div>
              </div>
            </div>

            {/* Liste des événements */}
            <div className="events-section"> <h2 className="section-title">Les Événements Actuels</h2> <div className="events-list"> {loading ? ( <div className="loading-container"> <div className="loading-spinner"></div> <h3>Chargement des événements...</h3> </div> ) : error ? ( <div className="error-container"> <span>⚠️</span> <h3>Erreur de chargement</h3> <p>{error}</p> <button onClick={() => fetchEventsRef.current && fetchEventsRef.current()}> 🔄 Réessayer </button> </div> ) : filteredEvents.length > 0 ? ( <div className="event-cards-grid"> {filteredEvents.slice(0, 2).map((event) => { const storedEvents = getParticipantEvents(); const alreadyAdded = storedEvents.some(e => e.id === event.id); return ( <div key={event.id} className="event-card"> <img src={event.image ? `${backendUrl}/storage/${event.image}` : 'https://picsum.photos/id/10/200/120 '} alt={event.title || 'Événement'} className="event-image" /> <div className="event-details"> <h3 className="event-title">{event.title || 'Sans titre'}</h3> <p className="event-date"> {formatDate(event.start_date)} - {formatDate(event.end_date)} </p> <p className="event-location"> <span className="location-pin">📍</span> {event.location || 'ensaj'} </p> </div> </div> ); })} </div> ) : ( <div className="empty-container"> <span>😔</span> <h3>Aucun événement disponible</h3> <button onClick={() => navigate('/all-events')}> ➕ Découvrir des événements </button> </div> )} </div> <a href="/all-events" onClick={(e) => { e.preventDefault(); navigate('/all-events'); }} className="view-all" > Voir tout → </a> </div>

            {/* Calendrier */}
            <div className="calendar-card">
              <div className="calendar-header">
                <h2 className="section-title">Calendrier</h2>
                <div className="calendar-nav">
                  <button onClick={() => handleMonthChange(-1)}>←</button>
                  <button onClick={() => handleMonthChange(1)}>→</button>
                </div>
              </div>
              <p className="calendar-month">{getMonthName(currentMonth)}</p>
              <div className="calendar-grid">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                  <div key={day} className="day-name">
                    {day}
                  </div>
                ))}
                {renderCalendarDays()}
              </div>
            </div>
            </div>
          </main>
        </div>
      </div>
    );
}