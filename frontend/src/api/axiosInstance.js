import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/api/v1/', // Base URL for your API
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
