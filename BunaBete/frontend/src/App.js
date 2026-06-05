import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import News from './pages/News';
import LiveScores from './pages/LiveScores';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Leagues from './pages/Leagues';
import MatchDetails from './pages/MatchDetails';
import NewsDetails from './pages/NewsDetails';
import TeamDetails from './pages/TeamDetails';
import LeagueDetails from './pages/LeagueDetails';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/live-scores" element={<LiveScores />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/matches/:id" element={<MatchDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/leagues" element={<Leagues />} />
          <Route path="/leagues/:id" element={<LeagueDetails />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
