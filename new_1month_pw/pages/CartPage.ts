import {Page, Locator} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button',{name:'Checkout'});
        this.continueShoppingButton = page.getByRole('button',{name:'Continue Shopping'});
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async getCartItemCount(): Promise<number>{
        await this.cartItems.first().waitFor({state:'visible'});
        return await this.cartItems.count();
    }

    async getCartItemNames(): Promise<string[]>{
        return await this.cartItems.locator('.inventory_item_name').allTextContents();
    }

    async removeItemByName(productName: string){
        const item = this.page.locator('.cart_item', {hasText: productName});
        await item.getByRole('button',{name:'Remove'}).click();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
    }

    async getItemPrice(productName: string): Promise<string>{
        const item = this.page.locator('.cart_item', {hasText: productName});
        return await item.locator('.inventory_item_price').textContent() || '';
    }

    async isItemInCart(productName: string): Promise<boolean>{
        const item = this.page.locator('.cart_item',{hasText: productName});
        return await item.isVisible();
    }

    async getCartItemDetails(productName: string){
        const item = this.page.locator('.cart_item', {hasText:productName});
        const name = await item.locator('.inventory_item_name').textContent() || '';
        const quantity = parseInt(await item.locator('.cart_quantity').textContent()||'0');
        return {name , quantity};
    }

    async getProductDescription(productName: string): Promise<string>{
        const item = this.page.locator('.cart_item',{hasText: productName});
        return await item.locator('.inventory_item_desc').textContent() || '';        
    }
}