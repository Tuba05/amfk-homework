import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import loginData from '../../test-data/loginData.json';

test.describe('Login Tests', () => {

  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateTo();
    await loginPage.login(
      loginData.valid.username,
      loginData.valid.password
    );

    await expect(page).toHaveURL(
      'https://www.saucedemo.com/inventory.html'
    );
  });

  for (const testCase of loginData.negativeCases) {
    test(`Login - ${testCase.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.navigateTo();
      await loginPage.login(
        testCase.username,
        testCase.password
      );

      await loginPage.assertErrorMessage(
        testCase.errorMessage
      );
    });
  }
});