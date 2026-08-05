import { createApp } from 'vue';
import { createPinia } from 'pinia';

import '@/assets/styles/main.scss';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue';
import router from './router';
import { i18nManager } from '@/locales';
import { AppPreset } from '@/utils/primevue.js';
import { storage } from '@/utils/storage.js';
import { useAuthStore } from '@/store/auth.js';

const app = createApp(App);

app.use(createPinia());
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

if (storage.getItem('user_token')) {
  const authStore = useAuthStore();
  authStore.SET_TOKEN(storage.getItem('user_token'));
}

i18nManager().then((i18n) => {
  app.use(i18n);
  app.mount('#app');
});
