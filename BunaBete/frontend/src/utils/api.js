import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout')
};

export const articlesAPI = {
  getArticles: (params) => api.get('/articles', { params }),
  getFeatured: () => api.get('/articles/featured'),
  getByCategory: (category) => api.get(`/articles/category/${category}`),
  getById: (id) => api.get(`/articles/${id}`)
};

export const matchesAPI = {
  getMatches: (params) => api.get('/matches', { params }),
  getLive: () => api.get('/matches/live'),
  getUpcoming: () => api.get('/matches/upcoming'),
  getByLeague: (league) => api.get(`/matches/league/${league}`),
  getById: (id) => api.get(`/matches/${id}`)
};

export const teamsAPI = {
  getTeams: (params) => api.get('/teams', { params }),
  getById: (id) => api.get(`/teams/${id}`),
  getByLeague: (league) => api.get(`/teams/league/${league}`)
};

export const leaguesAPI = {
  getLeagues: (params) => api.get('/leagues', { params }),
  getById: (id) => api.get(`/leagues/${id}`),
  getBySport: (sport) => api.get(`/leagues/sport/${sport}`)
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data)
};

export default api;
