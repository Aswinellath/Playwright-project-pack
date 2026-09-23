import {Page,Locator} from '@playwright/test';
import { SortOption } from '../utils/saucedemo-data';

export class ProductsPage{
    readonly page:Page;
    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly sortDropdown: Locator;
    readonly inventoryItemsNames: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.inventoryItemsNames = page.locator('[data-test="inventory-item-name"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    //Tip6

    async waitForProductsToLoad(){
        await this.page.waitForSelector('.inventory_item', {state: 'visible', timeout: 1000});
    }

    async waitForCartBadgeUpdate(expectedCount: string){
        await this.page.waitForFunction((count) => {
            const badge = document.querySelector('.shopping_cart_badge');
            return badge?.textContent == count;
        }, expectedCount);
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async getProductCount(): Promise<number>{
        await this.inventoryItems.first().waitFor({ state: 'visible' });
        return await this.inventoryItems.count();
    }

    async getinventoryItemNames(item:Locator,contentid:string):Promise<any>{
        return item.locator(contentid).textContent();
    }

    async getProductNames(): Promise<string[]>{
        // const items = await this.inventoryItems.all();
        // console.log('this is the items',items)
        // console.log('inventory names',this.inventoryItemsNames);
        // const names:string[] = [];
        // for (const item of items){
        //     const name = await this.getinventoryItemNames(item,'[data-test="inventory-item-name"]');
        //     // console.log('this is name',name);
        //     if(name) names.push(name);
        // }
        // return names;
        return await this.inventoryItems
            .locator('[data-test="inventory-item-name"]')
            .allTextContents();
    }

    async addProductToCartByName(productName: string){
        const product = this.page.locator('.inventory_item',{hasText: productName});
        await product.locator('button:has-text("Add to cart")').click();
    }

    async removeProductFromCartByName(productName: string){
        const product = this.page.locator('.inventory_item',{hasText: productName});
        await product.locator('button:has-text("Remove")').click();
    }

    async getCartItemCount(): Promise<string> {
        if(await this.shoppingCartBadge.isVisible()){
            return await this.shoppingCartBadge.textContent() || '0';
        } else {
            return '0';
        }
    }

    async clickShoppingCart() {
        await this.shoppingCartLink.click();
    }

    async sortBy(option: string){
        await this.sortDropdown.selectOption(option);
    }

    async getProductPrice(productName: string): Promise<string>{
        const product = this.page.locator('.inventory_item', {hasText: productName});
        return await product.locator('.inventory_item_price').textContent() || '';
    }

    async isProductInCart(productName: string): Promise<boolean> {
        const product = this.page.locator('.inventory_item',{hasText: productName});
        const removeButton = product.locator('button:has-text("Remove")');
        return await removeButton.isVisible();
    }

    async goToCart(){
        await this.shoppingCartLink.click();
    }

    async sortProducts(option: SortOption){
        await this.sortDropdown.selectOption(option);
    }


}