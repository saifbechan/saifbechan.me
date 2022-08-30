import { expect, test } from '@playwright/test';

test('should display the p5 canvas and contact section', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.p5Canvas')).toHaveAttribute('role', 'rocketeers');

  await expect(page.locator('footer')).toHaveCount(1);
});
