import {Page, Locator, expect} from '@playwright/test';


export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly shoppingCartContainer: Locator;
  readonly hamburgerMenuButton: Locator;
  readonly inventoryContainer: Locator;

  readonly cartLink: Locator;

  readonly souceBackpackAddToCartButton: Locator;
  readonly souceLabsBikeLightAddToCartButton: Locator;  
  readonly souceLabsBoltTShirtAddToCartButton: Locator;
  readonly souceLabsFleeceJacketAddToCartButton: Locator;
  readonly souceLabsOnesieAddToCartButton: Locator;
  readonly testAllTheThingsTShirtRedAddToCartButton: Locator;

  readonly souceBackpackRemoveFromCartButton: Locator;
  readonly souceLabsBikeLightRemoveFromCartButton: Locator;
  readonly souceLabsBoltTShirtRemoveFromCartButton: Locator;
  readonly souceLabsFleeceJacketRemoveFromCartButton: Locator;
  readonly souceLabsOnesieRemoveFromCartButton: Locator;
  readonly testAllTheThingsTShirtRedRemoveFromCartButton: Locator;
  
  readonly shoppingCartBadge: Locator;


  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.shoppingCartContainer = page.locator('#shopping_cart_container');
    this.hamburgerMenuButton = page.locator('#react-burger-menu-btn');
    this.inventoryContainer = page.locator('#inventory_container');

    this.cartLink = page.locator('a[data-test="shopping-cart-link"]');

    this.souceBackpackAddToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.souceLabsBikeLightAddToCartButton = page.locator('#add-to-cart-sauce-labs-bike-light');
    this.souceLabsBoltTShirtAddToCartButton = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
    this.souceLabsFleeceJacketAddToCartButton = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
    this.souceLabsOnesieAddToCartButton = page.locator('#add-to-cart-sauce-labs-onesie');
    this.testAllTheThingsTShirtRedAddToCartButton = page.locator('#add-to-cart-test.allthethings()-t-shirt-(red)');
    
    this.souceBackpackRemoveFromCartButton = page.locator('#remove-sauce-labs-backpack');
    this.souceLabsBikeLightRemoveFromCartButton = page.locator('#remove-sauce-labs-bike-light');
    this.souceLabsBoltTShirtRemoveFromCartButton = page.locator('#remove-sauce-labs-bolt-t-shirt');
    this.souceLabsFleeceJacketRemoveFromCartButton = page.locator('#remove-sauce-labs-fleece-jacket');
    this.souceLabsOnesieRemoveFromCartButton = page.locator('#remove-sauce-labs-onesie');
    this.testAllTheThingsTShirtRedRemoveFromCartButton = page.locator('#remove-test.allthethings()-t-shirt-(red)');
    
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
  }

  async assertShoppingCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
  }
  
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.page.locator(
        '[data-test="inventory-item"]',
        { hasText: productName }
    );

    await product.locator('button').click();
  }

  async removeBackpackFromCart(): Promise<void> {
    await this.souceBackpackRemoveFromCartButton.click();
  }

  async removeBikeLightFromCart(): Promise<void> {
    await this.souceLabsBikeLightRemoveFromCartButton.click();
  }

  async removeBoltTShirtFromCart(): Promise<void> {
    await this.souceLabsBoltTShirtRemoveFromCartButton.click();
  }

  async removeFleeceJacketFromCart(): Promise<void> {
    await this.souceLabsFleeceJacketRemoveFromCartButton.click();
  }

  async removeOnesieFromCart(): Promise<void> {
    await this.souceLabsOnesieRemoveFromCartButton.click();
  }

  async removeTestAllTheThingsTShirtRedFromCart(): Promise<void> {
    await this.testAllTheThingsTShirtRedRemoveFromCartButton.click();
  } 

  async isAppLogoVisible(): Promise<boolean> {
    return await this.pageTitle.isVisible();
  }

  async isShoppingCartContainerVisible(): Promise<boolean> {
    return await this.shoppingCartContainer.isVisible();
  }

  async isHamburgerMenuButtonVisible(): Promise<boolean> {
    return await this.hamburgerMenuButton.isVisible();
  }

  async isInventoryContainerVisible(): Promise<boolean> {
    return await this.inventoryContainer.isVisible();
  }
}