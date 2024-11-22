// src/services/api.js

import axios from 'axios';

// URL base de la API
const API_URL = 'http://127.0.0.1:8000/api'; // Sin barra final



// Crear una instancia de axios con el Content-Type por defecto
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitudes para agregar el token de autorización
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para refrescar el token
const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (refresh_token) {
    try {
      // Usamos axios sin interceptores para evitar problemas con tokens expirados
      const response = await axios.post(`${API_URL}/auth/refresh/`, {
        refresh: refresh_token,
      });
      localStorage.setItem('access_token', response.data.access);
      // Actualizamos el header de autorización en la instancia 'api'
      api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
      return response.data.access;
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      logout();
      return null;
    }
  } else {
    logout();
    return null;
  }
};

// Interceptor de respuestas para manejar errores de autenticación
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Si el token ha expirado, intenta refrescarlo
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        // Actualizamos el header de autorización en la instancia 'api'
        api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        // Reintentamos la solicitud original con el nuevo token
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

// Funciones de Autenticación
export const register = async (username, email, password) => {
  try {
    const response = await api.post('/auth/register/', {
      username: username,
      email: email,
      password: password,
    });
    const { access, refresh, user } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    api.defaults.headers.common['Authorization'] = 'Bearer ' + access;
    window.dispatchEvent(new Event('authChange'));
    return user;
  } catch (error) {
    console.error('Error en el registro:', error.response ? error.response.data : error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/login/', {
      username,
      password,
    });
    const { access, refresh } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    // Establecer el encabezado de autorización en la instancia 'api'
    api.defaults.headers.common['Authorization'] = 'Bearer ' + access;
    // Disparar evento personalizado para notificar el cambio de autenticación
    window.dispatchEvent(new Event('authChange'));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete api.defaults.headers.common['Authorization'];
  // Disparar evento personalizado para notificar el cierre de sesión
  window.dispatchEvent(new Event('authChange'));
};

// Funciones para Restaurantes
export const getRestaurants = async () => {
  try {
    const response = await api.get('/restaurants/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getRestaurantDetails = async (id) => {
  try {
    const response = await api.get(`/restaurants/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Funciones para Reseñas
export const getReviews = async () => {
  try {
    const response = await api.get('/reviews/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const submitReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews/', reviewData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Funciones para Perfil de Usuario
export const getProfile = async () => {
  try {
    const response = await api.get('/profile/');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const formData = new FormData();
    formData.append('user.first_name', profileData.user.first_name);
    formData.append('user.last_name', profileData.user.last_name);
    formData.append('user.email', profileData.user.email);
    formData.append('phone', profileData.phone);
    if (profileData.avatar) {
      formData.append('avatar', profileData.avatar); // Agrega la imagen
    }

    const response = await api.put('/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Configura para manejar archivos
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
