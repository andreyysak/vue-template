import { http, HttpResponse } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import router from '@/router/index.js';
import { testPassword, testToken, testUser } from '@/test/mocks/fixtures.js';
import { api } from '@/test/mocks/handlers.js';
import { server } from '@/test/mocks/server.js';
import { storage } from '@/utils/storage.js';
import { useAuthStore } from './auth.js';

describe('auth store', () => {
  it('logs in and saves the token', async () => {
    const store = useAuthStore();

    await store.LOGIN({ email: testUser.email, password: testPassword, remember: true });

    expect(store.isAuth).toBe(true);
    expect(storage.getItem('user_token')).toBe(testToken);
    expect(storage.getItem('remember_token')).toBe('true');
    expect(store.loginStatus).toEqual({ loading: false, done: true, error: null });
  });

  it('throws validation errors returned by the API', async () => {
    const errors = { email: ['The email field is required.'] };
    server.use(http.post(api('v1/auth/login'), () => HttpResponse.json({ errors }, { status: 422 })));
    const store = useAuthStore();

    await expect(store.LOGIN({})).rejects.toEqual(errors);
    expect(store.isAuth).toBe(false);
    expect(store.loginStatus.loading).toBe(false);
  });

  it('loads the current user', async () => {
    storage.setItem('user_token', testToken);
    const store = useAuthStore();

    await store.SET_AUTH();

    expect(store.me).toEqual(testUser);
  });

  it('clears the session and redirects to login on logout', async () => {
    const store = useAuthStore();
    store.SET_TOKEN(testToken);

    await store.LOGOUT();

    expect(store.isAuth).toBe(false);
    expect(storage.getItem('user_token')).toBeNull();
    await vi.waitFor(() => expect(router.currentRoute.value.name).toBe('Login'));
  });
});
