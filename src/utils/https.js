import axios from 'axios';
import router from '@/router/index.js';
import { storage } from '@/utils/storage.js';
import { useAuthStore } from '@/store/auth.js';

export const $http = axios.create({
  baseURL: import.meta.env.VITE_APP_ROOT_API,
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

let throttleDelay = false;
$http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const authStore = useAuthStore();
    switch (error.response.status) {
      case 500: {
        router.push({ name: 'server-error' });
        break;
      }
      case 404: {
        router.push({ name: 'page-not-found' });
        break;
      }
      case 401: {
        if (storage.getItem('user_token')) {
          if (!throttleDelay) {
            throttleDelay = true;
            if (storage.getItem('remember_token')) {
              authStore.REFRESH().then(() => {});
            } else {
              authStore.REMOVE_TOKEN();
            }
          }
        } else {
          router.push({ name: 'Login' });
        }
        break;
      }
      default: {
        break;
      }
    }
    return Promise.reject(error.response);
  }
);
