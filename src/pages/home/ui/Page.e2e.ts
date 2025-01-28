import { expect, test } from '@playwright/test';

test.use({
  locale: 'ru'
});

test('Should have correct title after initial render (ru)', async ({
  page
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Фронтенд-разработчик/i);
});
