import { describe, expect, it } from 'vitest';
import { storage } from './storage.js';

describe('storage', () => {
  it('prefixes keys with the app name', () => {
    storage.setItem('user_token', 'abc');

    expect(localStorage.getItem('APP_TEST_user_token')).toBe('abc');
    expect(storage.getItem('user_token')).toBe('abc');
  });

  it('removes several items', () => {
    storage.setItem('a', '1');
    storage.setItem('b', '2');

    storage.removeItems(['a', 'b']);

    expect(localStorage.length).toBe(0);
  });
});
