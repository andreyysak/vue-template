import { expect, test } from './fixtures.js';

test.describe('accessibility', () => {
  for (const [path, selector] of [
    ['/auth', '.auth-layout'],
    ['/does-not-exist', '.error-page']
  ]) {
    test(`${path} has no a11y violations`, async ({ page, makeAxeBuilder }) => {
      await page.goto(path);
      await expect(page.locator(selector)).toBeAttached();

      const { violations } = await makeAxeBuilder().analyze();

      expect(violations).toEqual([]);
    });
  }
});
