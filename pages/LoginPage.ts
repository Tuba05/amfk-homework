import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  readonly errorMessage: Locator;
  readonly errorButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');

    this.errorMessage = page.locator('h3[data-test="error"]');
    this.errorButton = page.locator('button[data-test="error"]');

  }

  async navigateTo(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertErrorMessage(expectedMessage: string): Promise<void> {
      await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async assertUsernameHasErrorClass(): Promise<void> {
      await expect(this.usernameInput).toHaveClass(/input_error/);
  }

  async assertPasswordHasErrorClass(): Promise<void> {
      await expect(this.passwordInput).toHaveClass(/input_error/);
  }
}