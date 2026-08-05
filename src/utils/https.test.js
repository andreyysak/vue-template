import { http, HttpResponse } from 'msw';
import { describe, expect, it, vi } from 'vitest';
import router from '@/router/index.js';
import { useAuthStore } from '@/store/auth.js';
import { testRefreshedToken, testUser } from '@/test/mocks/fixtures.js';
import { api } from '@/test/mocks/handlers.js';
import { server } from '@/test/mocks/server.js';
import { $http } from './https.js';
import { storage } from './storage.js';

describe('$http', () => {
  it('refreshes an expired token and retries the request', async () => {
    storage.setItem('user_token', 'expired-token');
    storage.setItem('remember_token', 'true');

    const response = await $http.get('v1/auth/me');

    expect(response.data.data).toEqual(testUser);
    expect(storage.getItem('user_token')).toBe(testRefreshedToken);
  });

  it('logs out on 401 when the session is not remembered', async () => {
    storage.setItem('user_token', 'expired-token');
    useAuthStore().SET_TOKEN('expired-token');

    await expect($http.get('v1/auth/me')).rejects.toMatchObject({ status: 401 });

    expect(useAuthStore().isAuth).toBe(false);
    expect(storage.getItem('user_token')).toBeNull();
    await vi.waitFor(() => expect(router.currentRoute.value.name).toBe('Login'));
  });

  it('opens the server error page on 500', async () => {
    server.use(http.get(api('v1/auth/me'), () => new HttpResponse(null, { status: 500 })));

    await expect($http.get('v1/auth/me')).rejects.toMatchObject({ status: 500 });

    await vi.waitFor(() => expect(router.currentRoute.value.name).toBe('server-error'));
  });
});
