import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@/assets/styles/main.scss';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import router from './router';
import { i18n } from '@/locales';
import { AppPreset } from '@/utils/primevue.js';
import { storage } from '@/utils/storage.js';
import { useAppStore } from '@/store/app.js';
import { useAuthStore } from '@/store/auth.js';

const app = createApp(App);

app.use(createPinia());

const appStore = useAppStore();
appStore.SET_THEME(appStore.theme);

if (storage.getItem('user_token')) {
  const authStore = useAuthStore();
  authStore.SET_AUTH().catch(() => {});
}

app.use(i18n);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: AppPreset,
    options: {
      darkModeSelector: '.dark-theme',
      cssLayer: false
    }
  }
});
app.use(ToastService);

app.mount('#app');
