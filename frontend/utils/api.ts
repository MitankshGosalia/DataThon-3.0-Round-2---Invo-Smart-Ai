import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const response = await api.post('/token', { username: email, password });
  return response.data;
};

export const uploadInvoice = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/invoices/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getInvoices = async (params?: { skip?: number; limit?: number }) => {
  const response = await api.get('/invoices', { params });
  return response.data;
};

export const getInvoice = async (id: number) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};

export const getAnalytics = async () => {
  const response = await api.get('/analytics');
  return response.data;
};

export const updateProfile = async (data: any) => {
  const response = await api.put('/users/me', data);
  return response.data;
};

export default api;
