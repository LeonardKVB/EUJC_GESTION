import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1',
});

// Intercepteur pour ajouter le token JWT
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('eujc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs 401/403
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('eujc_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
