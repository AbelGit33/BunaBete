import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile');
      if (response.data.role !== 'admin') {
        logout();
      } else {
        setUser(response.data);
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const { token, user } = response.data;
    if (user.role !== 'admin') throw new Error('Not authorized');
    localStorage.setItem('adminToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  if (loading) return <div style={{color: 'white', padding: '50px', textAlign: 'center'}}>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
