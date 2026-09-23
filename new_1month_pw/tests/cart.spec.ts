import {test,expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { ProductsPage } from '../pages/ProductsPage';

import { CartPage } from '../pages/CartPage'


test.describe('cart item display details',()=>{
    test.beforeEach(async({page})=>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        //Login before each test

        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');

    });

    test('should display correct quantity for each cart item',async()=>{
        // const cartPage = new CartPage(page);
        

        //Add mulitple items
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Bike Light');
        await productsPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        await productsPage.clickShoppingCart();

        //Each item should have a quantity of 1

        const backpackDetails = await cartPage.getCartItemDetails('Sauce Labs Backpack');
        const bikeLightDetails = await cartPage.getCartItemDetails('Sauce Labs Bike Light');
        const tshirtDetails = await cartPage.getCartItemDetails('Sauce Labs Bolt T-shirt');

        //verify quantities

        await expect(backpackDetails.quantity).toBe(1);
        await expect(bikeLightDetails.quantity).toBe(1);
        await expect(tshirtDetails.quantity).toBe(1);

        //verify names match expected

        await expect(backpackDetails.name).toBe('Sauce Labs Backpack');
        await expect(bikeLightDetails.name).toBe('Sauce Labs Bike Light');
        await expect(tshirtDetails.name).toBe('Sauce Labs Bolt T-shirt');

    });

    test('should display product description in cart', async()=>{
        //Add items with known descriptions

        // const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Onesie');
        await productsPage.clickShoppingCart();
        
        //Get description form cart

        const backpackDescription = await cartPage.getProductDescription('Sauce Labs Backpack');
        const onesieDescription = await cartPage.getProductDescription('Sauce Labs Onesie');

        //Verify description exist and have content

        expect(backpackDescription).toBeTruthy();
        expect(backpackDescription.length).toBeGreaterThan(0);
        expect(backpackDescription).toContain('carry.allTheThings()');
        expect(onesieDescription).toBeTruthy();
        expect(onesieDescription.length).toBeGreaterThan(0);
        expect(onesieDescription).toContain('Rib snap');
    });
});