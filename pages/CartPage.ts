import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;

  readonly cartItems: Locator;
  readonly cartItemsContainer: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeItemButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('span[data-test="title"]');

    this.cartItems = page.locator('.cart_item');
    this.cartItemsContainer = page.locator('.cart_list');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeItemButtons = page.locator('.cart_button');
  }

  async assertCartItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.cartItemsContainer.locator('.cart_item').count();
    if (actualCount !== expectedCount) {
      throw new Error(`Expected cart item count to be ${expectedCount}, but got ${actualCount}`);
    }
  }    
  
  getProduct(productName: string): Locator {
    return this.page.locator('[data-test="inventory-item"]', {
        hasText: productName,
    });
}
  
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async removeItemByName(itemName: string): Promise<void> {
    const itemLocator = this.cartItemsContainer.locator(`.inventory_item_name:has-text("${itemName}")`);
    const removeButton = itemLocator.locator('..').locator('.cart_button');
    await removeButton.click();
  }
}