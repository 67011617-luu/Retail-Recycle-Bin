import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const scanProduct = async (barcode) => {
  const response = await api.post('/products/scan', { barcode });
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

// User APIs
export const verifyUser = async (phone) => {
  const response = await api.post('/users/verify', { phone });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const getUserByPhone = async (phone) => {
  const response = await api.get(`/users/${phone}`);
  return response.data;
};

// Reward APIs
export const rewardUser = async (phone, barcode) => {
  const response = await api.post('/rewards', { phone, barcode });
  return response.data;
};

// History APIs
export const getHistory = async (phone) => {
  const response = await api.get(`/history/${phone}`);
  return response.data;
};

export const getAllTransactions = async () => {
  const response = await api.get('/history');
  return response.data;
};

export default api;
