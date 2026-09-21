import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import loginData from '../../test-data/loginData.json';
import checkout from '../../test-data/checkoutData.json';

test.describe('Checkout Tests', () => {
  test('User can add a product to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigateTo();

    await loginPage.login(
      loginData.valid.username,
      loginData.valid.password
    );

    await expect(productsPage.pageTitle).toHaveText('Products');

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    const backpack = cartPage.getProduct('Sauce Labs Backpack');

    await expect(backpack).toBeVisible();
    await expect(backpack).toContainText('Sauce Labs Backpack');

    await cartPage.clickCheckout();

    await checkoutPage.fillCheckoutInformation(checkout.customer.firstName, checkout.customer.lastName, checkout.customer.postalCode);
    
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(checkoutPage.confirmationMessage).toHaveText('Thank you for your order!');
    await expect(checkoutPage.completionMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await expect(checkoutPage.backToProductsButton).toBeVisible();
    await expect(checkoutPage.generatePdfButton).toBeVisible();
});

test('Checkout requires first name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigateTo();
    
    await loginPage.login(
      loginData.valid.username,
      loginData.valid.password
    );
    await productsPage.openCart();

    await cartPage.clickCheckout();

    await checkoutPage.fillCheckoutInformation(
        checkout.validation.emptyFirstName.firstName,
        checkout.validation.emptyFirstName.lastName,
        checkout.validation.emptyFirstName.postalCode
    );
    await checkoutPage.clickContinue();

    await expect(checkoutPage.errorMessage).toHaveText(
        checkout.validation.emptyFirstName.errorMessage)
});

test('User can add multiple products to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigateTo();

    await loginPage.login(
      loginData.valid.username,
      loginData.valid.password
    );

    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.addProductToCart('Sauce Labs Bike Light');

    await productsPage.openCart();

    await expect(
      cartPage.getProduct('Sauce Labs Backpack')
    ).toBeVisible();

    await expect(
      cartPage.getProduct('Sauce Labs Bike Light')
    ).toBeVisible();
})
});