import { describe, expect, it } from 'vitest';
import { useAuthStore } from '@/store/auth.js';
import { authGuard } from './permissions.js';

describe('authGuard', () => {
  it('redirects a guest from a protected route to login', () => {
    expect(authGuard({ meta: { requiresAuth: true }, fullPath: '/profile' })).toEqual({
      name: 'Login',
      query: { redirect: '/profile' }
    });
  });

  it('redirects an authenticated user from a guest-only route', () => {
    useAuthStore().SET_TOKEN('token');

    expect(authGuard({ meta: { guestOnly: true } })).toEqual({ name: 'Home' });
  });

  it('allows navigation otherwise', () => {
    expect(authGuard({ meta: { guestOnly: true } })).toBeUndefined();

    useAuthStore().SET_TOKEN('token');
    expect(authGuard({ meta: { requiresAuth: true } })).toBeUndefined();
  });
});
