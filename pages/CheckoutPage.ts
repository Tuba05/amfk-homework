import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;   
    readonly finishButton: Locator;
    readonly confirmationMessage: Locator;
    readonly completionMessage: Locator;
    readonly backToProductsButton: Locator;
    readonly generatePdfButton: Locator;
    readonly errorMessage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.confirmationMessage = page.locator('h2[data-test="complete-header"]');
        this.completionMessage = page.locator('div[data-test="complete-text"]');
        this.backToProductsButton = page.locator('#back-to-products');
        this.generatePdfButton = page.locator('#generate-pdf-order');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }
}