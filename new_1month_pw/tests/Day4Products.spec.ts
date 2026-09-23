import {test,expect} from '@playwright/test'

import { LoginPage } from '../pages/LoginPage'

import { ProductsPage } from '../pages/ProductsPage'
import { SortOption } from '../utils/saucedemo-data';

test.describe('Saucedemo Products Tests',()=>{
    test.beforeEach(async({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');

    });

    test.afterEach(async({page})=>{
        // const loginPage = new LoginPage(page);
        await page.close();
    })

    test('display all products', async({page})=>{
        const productsPage = new ProductsPage(page);
        const productCount = await productsPage.getProductCount();
        // console.log('product count issss',productCount);
        await expect(productCount).toBe(6);
    })

    test('can add product to cart', async({page})=>{
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        const cartCount = await productsPage.getCartItemCount();
        expect(cartCount).toBe('1');
        const isInCart = await productsPage.isProductInCart('Sauce Labs Backpack');
        expect(isInCart).toBeTruthy();
    });

    test('can add multiple products to cart', async({page})=>{
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce labs Bike Light');
        const cartCount = await productsPage.getCartItemCount();
        expect(cartCount).toBe('2');
    });

    test('can remove product from cart', async({page})=>{
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.removeProductFromCartByName('Sauce Labs Backpack');

        const cartCount = await productsPage.getCartItemCount();
        expect(cartCount).toBe('0');
    });

    test('can sort products by name A-Z',async({page})=>{
        const productsPage = new ProductsPage(page);
        await productsPage.sortProducts(SortOption.NAME_ASC);
        const productNames = await productsPage.getProductNames();
        console.log(productNames[0]);
        await expect(productNames[0]).toBe('Sauce Labs Backpack');
    });

    test('can sort products by price low to high', async({page})=>{
        const productsPage = new ProductsPage(page);
        await productsPage.sortProducts(SortOption.PRICE_LOW_HIGH);
        const productNames = await productsPage.getProductNames();
        const firstProductPrice = await productsPage.getProductPrice(productNames[0]);
        await expect(firstProductPrice).toContain('$7.99');
    });
});
