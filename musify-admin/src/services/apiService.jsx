import axios from "axios";
import { API_BASE_URL } from "../config";

// create axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    // headers: {
    //     'Content-Type': 'application/json'
    // }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // ✅ space added
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor to handle auth errors globally
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) { // ✅ typo fixed
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser'); // ✅ typo fixed
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const songsAPI = {
  add: (formData) => apiClient.post('/api/songs', formData),
  list: () => apiClient.get('/api/songs'),
  remove: (id) => apiClient.delete(`/api/songs/${id}`),
};


export const albumsAPI = {
  add: (formData) => apiClient.post('/api/albums', formData),
  list: () => apiClient.get('/api/albums'),
  remove: (id) => apiClient.delete(`/api/albums/${id}`),
};


export default apiClient;