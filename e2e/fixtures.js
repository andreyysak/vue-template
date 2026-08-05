import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';
import { E2E_API_URL, e2eToken, e2eUser, storageKey } from './constants.js';

/** Мок API: дефолтні відповіді + можливість перевизначити окремий ендпоінт у тесті */
class ApiMock {
  overrides = new Map();

  constructor(page) {
    this.page = page;
  }

  async init() {
    await this.page.route(`${E2E_API_URL}/**`, async (route) => {
      const request = route.request();
      const path = new URL(request.url()).pathname.replace(new URL(E2E_API_URL).pathname, '');
      const key = `${request.method()} ${path}`;

      const override = this.overrides.get(key);
      if (override) return override(route);

      switch (key) {
        case 'GET /v1/translations':
          return route.fulfill({ json: {} });
        case 'POST /v1/auth/login':
          return route.fulfill({ json: { access_token: e2eToken } });
        case 'POST /v1/auth/logout':
          return route.fulfill({ json: {} });
        case 'GET /v1/auth/me':
          return request.headers().authorization === `Bearer ${e2eToken}`
            ? route.fulfill({ json: { data: e2eUser } })
            : route.fulfill({ status: 401, json: { message: 'Unauthenticated' } });
        default:
          return route.fulfill({ status: 404, json: { message: `No mock for ${key}` } });
      }
    });
  }

  /** Напр. api.on('GET /v1/auth/me', (route) => route.fulfill({ status: 500 })) */
  on(key, handler) {
    this.overrides.set(key, handler);
  }
}

export const test = base.extend({
  api: [
    async ({ page }, use) => {
      const api = new ApiMock(page);
      await api.init();
      await use(api);
    },
    { auto: true }
  ],

  /** Виконує вхід, підкладаючи токен у localStorage до завантаження сторінки */
  login: async ({ page }, use) => {
    await use(async (token = e2eToken) => {
      await page.addInitScript(([key, value]) => localStorage.setItem(key, value), [storageKey('user_token'), token]);
    });
  },

  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']));
  }
});

export { expect } from '@playwright/test';
