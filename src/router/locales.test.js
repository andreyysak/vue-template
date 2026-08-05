import { describe, expect, it } from 'vitest';
import { storage } from '@/utils/storage.js';
import { createLocaleRoute, getRouteLocale } from './locales.js';

describe('router locales', () => {
  it.each([
    ['/', 'uk'],
    ['/auth', 'uk'],
    ['/en', 'en'],
    ['/en/auth', 'en'],
    ['/english', 'uk']
  ])('getRouteLocale(%s) -> %s', (path, locale) => {
    expect(getRouteLocale(path)).toBe(locale);
  });

  it('removes the prefix for the default locale', () => {
    expect(createLocaleRoute('/en/auth')).toBe('/auth');
  });

  it('adds the prefix of the user locale', () => {
    storage.setItem('user_locale', 'en');

    expect(createLocaleRoute('/auth')).toBe('/en/auth');
    expect(createLocaleRoute('/')).toBe('/en');
  });
});
