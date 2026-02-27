import axios from 'axios';
import { ENV } from './env';
import { storageManager } from '../utils/storage';

// Create axios instance
const api = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from storage (checks both localStorage and sessionStorage)
    const token = storageManager.getItem('token');
    
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none'
    });
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token added to request headers');
    } else {
      console.log('⚠️  No token available for request');
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      success: response.data?.success
    });
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      console.log('🚪 Unauthorized - Clearing auth and redirecting to home');
      // Token expired or invalid
      storageManager.clearAuth();
      window.location.href = '/';
    }
    
    return Promise.reject(error);
  }
);

export default api;

