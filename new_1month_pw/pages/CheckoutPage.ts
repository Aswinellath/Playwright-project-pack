import {Page, Locator} from '@playwright/test';

export class CheckoutPage{
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton : Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button',{name:'Continue'});
        this.finishButton = page.getByRole('button',{name:'Finish'});
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.getByRole('button',{name:'Back Home'});
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillShippingInformation(firstName: string, lastName: string, postalCode: string){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue(){
        await this.continueButton.click();
    }

    async clickFinish(){
        await this.finishButton.click();
    }

    async getCompleteMessage(): Promise<string>{
        return await this.completeHeader.textContent() || '';
    }

    async isOrderComplete(): Promise<boolean> {
        return await this.completeHeader.isVisible();
    }

    async clickBackHome(){
        await this.backHomeButton.click();
    }

    async getErrorMessage(): Promise<string>{
        return await this.errorMessage.textContent() || '';
    }
}