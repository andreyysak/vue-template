import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import { afterAll, afterEach, beforeAll, beforeEach } from 'vitest';
import { server } from './mocks/server.js';

// jsdom не реалізує API, на які спираються компоненти PrimeVue
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
});

window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Element.prototype.scrollIntoView = () => {};

beforeAll(() => server.listen({ onUnhandledFrame: 'error' }));

// Свіжа Pinia на кожен тест — стори не ділять стан між тестами
beforeEach(() => setActivePinia(createPinia()));

afterEach(() => {
  cleanup();
  server.resetHandlers();
  localStorage.clear();
});

afterAll(() => server.close());
