import {test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { ProductsPage } from '../pages/ProductsPage';

import productsData from '../test data/saucedemo-products.json';

test.describe('SauceDemo Products from JSON', ()=>{
    test.beforeEach(async({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');

    });

    for (const product of productsData) {
        test(`can add ${product.name} to cart`, async({page})=>{
            const productsPage = new ProductsPage(page);
            await productsPage.addProductToCartByName(product.name);
            const isInCart = await productsPage.isProductInCart(product.name);
            expect(isInCart).toBe(product.expectedInCart);
            const price = await productsPage.getProductPrice(product.name);
            expect(price).toBe(product.price);
        });
    }

    

});