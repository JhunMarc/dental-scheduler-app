import axios from 'axios';

const api = axios.create({
  baseURL:  'https://af628dd5bb4904bc4aac6c6f3ffb272e-1608246877.us-east-1.elb.amazonaws.com/api', // 'http://localhost:5000/api',
});

// Attached token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;