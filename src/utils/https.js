import axios from 'axios';
import router from '@/router/index.js';
import { storage } from '@/utils/storage.js';
import { useAuthStore } from '@/store/auth.js';

export const $http = axios.create({
  baseURL: import.meta.env.VITE_APP_ROOT_API,
  timeout: 30000,
  headers: {
    Accept: 'application/json'
  }
});

$http.interceptors.request.use(
  (config) => {
    const token = storage.getItem('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// One shared refresh request for all parallel 401 responses
let refreshPromise = null;
const refreshToken = () => {
  if (!refreshPromise) {
    const authStore = useAuthStore();
    refreshPromise = authStore.REFRESH().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

$http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const status = error.response?.status;

    if (status === 500) {
      router.push({ name: 'server-error' });
    }

    if (status === 401) {
      const authStore = useAuthStore();
      const isRefreshRequest = request?.url?.includes('auth/refresh');

      if (!storage.getItem('user_token')) {
        router.push({ name: 'Login' });
      } else if (storage.getItem('remember_token') && !isRefreshRequest && !request._retry) {
        request._retry = true;
        try {
          await refreshToken();
          return $http(request);
        } catch {
          // REFRESH already removed the token
        }
      } else if (!isRefreshRequest) {
        authStore.REMOVE_TOKEN();
      }
    }

    return Promise.reject(error.response ?? error);
  }
);
