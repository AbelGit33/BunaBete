import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const articlesAPI = {
  getAll: () => api.get('/articles'),
  getById: (id) => api.get(`/articles/${id}`),
  create: (data) => api.post('/articles', data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`)
};

export const matchesAPI = {
  getAll: () => api.get('/matches'),
  getById: (id) => api.get(`/matches/${id}`),
  create: (data) => api.post('/matches', data),
  update: (id, data) => api.put(`/matches/${id}`, data),
  updateScore: (id, data) => api.put(`/matches/${id}/score`, data),
  delete: (id) => api.delete(`/matches/${id}`)
};

export const teamsAPI = {
  getAll: () => api.get('/teams'),
  create: (data) => api.post('/teams', data),
  update: (id, data) => api.put(`/teams/${id}`, data),
  delete: (id) => api.delete(`/teams/${id}`)
};

export const leaguesAPI = {
  getAll: () => api.get('/leagues'),
  create: (data) => api.post('/leagues', data),
  update: (id, data) => api.put(`/leagues/${id}`, data),
  delete: (id) => api.delete(`/leagues/${id}`)
};

export default api;
