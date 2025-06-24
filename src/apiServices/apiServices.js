import axios from 'axios';
import { ApiConstants } from '@/constants/ApiConstants';

// Create axios instance
const apiClient = axios.create({
  baseURL: ApiConstants.base_url,
//   timeout: ApiConstants.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('token');
    // console.log('token', token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
    const method = config.method?.toUpperCase() || 'UNKNOWN';
    console.log(`[API] ${method} → ${fullUrl}`);
    if (config.data) {
      console.log('Request Body:', config.data);
    }
    return config;
  },
  (error) => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 403) {
      console.log('Forbidden (403): Access denied.');
      await localStorage.removeItem('token');
      // For React web apps, you might want to redirect using window.location
      // or use React Router's navigate function
      // window.location.href = '/login';
      
      // If using React Router v6:
      // import { useNavigate } from 'react-router-dom';
      // const navigate = useNavigate();
      // navigate('/login', { replace: true });
      
      // For now, just logging the redirect action
      console.log('Redirecting to login page...');
    }
    return Promise.reject(error);
  },
);

// API methods
const GET = (url, config = {}) => apiClient.get(url, config);

const POST = (url, data = {}, config = {}) => apiClient.post(url, data, config);

const PUT = (url, data = {}, config = {}) => apiClient.put(url, data, config);

const PATCH = (url, data = {}, config = {}) => apiClient.patch(url, data, config);

const DELETE = (url, config = {}) => apiClient.delete(url, config);

const API = {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
};

export default API;