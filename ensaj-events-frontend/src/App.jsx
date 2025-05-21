import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ParticipantDashboard from './components/ParticipantDashboard';
import React from 'react';
import AddEvent from './components/AddEvent';
import Events from './components/Events';
import EditEvent from './components/EditEvent';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import PublicEvents from './components/PublicEvents';
import AllEventsPage from './components/AllEventsPage';
import ParticipantEventPage from './components/ParticipantEventPage'; 


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/participant-dashboard" element={<ParticipantDashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/admin/add-event" element={<AddEvent />} />
                <Route path="/admin/events" element={<Events />} />
                <Route path="/admin/edit-event/:id" element={<EditEvent />} />
                <Route path="/admin/users" element={<UsersList />} />
                <Route path="/admin/add-user" element={<AddUser />} />
                <Route path="/events" element={<PublicEvents />} />
                <Route path="/all-events" element={<AllEventsPage />} />
                <Route path="/participant/events" element={<ParticipantEventPage />} />
            </Routes>
        </Router>
    );
}

export default App;