import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { getActivePinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { i18n } from '@/locales';
import router from '@/router/index.js';

/**
 * Рендер компонента з плагінами застосунку: Pinia (свіжа на кожен тест), i18n, PrimeVue, ToastService.
 * Опція `route` додає роутер застосунку і переходить на вказаний шлях.
 */
export const renderComponent = async (component, { route, global = {}, ...options } = {}) => {
  const plugins = [getActivePinia(), i18n, [PrimeVue, { theme: 'none' }], ToastService];

  if (route) {
    plugins.push(router);
    await router.push(route);
    await router.isReady();
  }

  return {
    user: userEvent.setup(),
    router,
    ...render(component, {
      ...options,
      global: { ...global, plugins: [...plugins, ...(global.plugins ?? [])] }
    })
  };
};

export * from '@testing-library/vue';
