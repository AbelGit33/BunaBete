import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Articles from './pages/Articles';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Leagues from './pages/Leagues';
import Users from './pages/Users';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/login" />;
  return children;
};

const AppContent = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0a1a'}}>
      <Navbar />
      <div style={{display: 'flex', flex: 1}}>
        <Sidebar />
        <main style={{flex: 1, padding: '20px 30px', marginLeft: '250px', marginTop: '60px', color: 'white'}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
