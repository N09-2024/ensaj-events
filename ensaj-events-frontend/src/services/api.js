import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
     withXSRFToken: true,
     // Required for CSRF cookie to be sent
});

// Function to fetch CSRF token
export const getCsrfToken = async () => {
    try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        });
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        throw error;
    }
};

// Add Bearer token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
api.postForm = async (url, data) => {
    return api.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

api.putForm = async (url, data) => {
    return api.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default api;
