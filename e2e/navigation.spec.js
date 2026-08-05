import { expect, test } from './fixtures.js';

// Сторінки шаблону поки порожні, тому перевіряється наявність у DOM (toBeAttached).
// Коли з'явиться контент — перевіряйте видимі елементи: getByRole('heading', { name: ... })
test.describe('navigation', () => {
  test('redirects a guest to the login page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/auth?redirect=/');
    await expect(page.locator('.auth-layout')).toBeAttached();
  });

  test('opens a protected page for an authenticated user', async ({ page, login }) => {
    await login();
    await page.goto('/');

    await expect(page.locator('.main-layout .home')).toBeAttached();
  });

  test('redirects an authenticated user away from the login page', async ({ page, login }) => {
    await login();
    await page.goto('/auth');

    await expect(page).toHaveURL('/');
  });

  test('logs out when the token is rejected', async ({ page, login }) => {
    await login('expired-token');
    await page.goto('/');

    await expect(page).toHaveURL(/\/auth/);
  });

  test('shows the server error page when the API fails', async ({ page, api, login }) => {
    api.on('GET /v1/auth/me', (route) => route.fulfill({ status: 500, json: {} }));
    await login();
    await page.goto('/');

    await expect(page).toHaveURL('/500');
  });

  test('shows 404 for an unknown route', async ({ page }) => {
    await page.goto('/does-not-exist');

    await expect(page.locator('.error-page')).toBeAttached();
  });
});

test.describe('locales', () => {
  test('uses the default locale without a prefix', async ({ page }) => {
    await page.goto('/auth');

    await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
  });

  test('switches the locale from the URL prefix and keeps it on navigation', async ({ page }) => {
    await page.goto('/en/auth');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveURL('/en/auth');
  });
});
