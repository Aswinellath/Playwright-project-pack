import {test, expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { ProductsPage } from '../pages/ProductsPage';   

import { CartPage } from '../pages/CartPage';

import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo End-to-End Checkout flow',()=>{
    
    test.beforeEach(async({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');
    });
    
    test('Complete checkout flow with multiple products', async({page}) => {
        
        // Step 1: Login
        
        // const loginPage = new LoginPage(page);
        // await loginPage.goto();
        // await loginPage.login('standard_user','secret_sauce');

        // step 2: Add products to cart

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Bike Light');

        // Verify cart count

        const cartCount = await productsPage.getCartItemCount();
        expect(cartCount).toBe('2');

        //step 3:Go to cart

        await productsPage.clickShoppingCart();

        //step 4: Verify cart contents

        const cartPage = new CartPage(page);
        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBe(2);
        const itemNames = await cartPage.getCartItemNames();
        expect(itemNames).toContain('Sauce Labs Backpack');
        expect(itemNames).toContain('Sauce Labs Bike Light');

        //step 5: Proceed to checkout

        await cartPage.clickCheckout();

        //step 6: Fill shipping information

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillShippingInformation('Aswin','E','673016');

        await checkoutPage.clickContinue();

        //step 7: Complete order

        await checkoutPage.clickFinish();

        //step 8: Verify order completion

        // const isComplete = await checkoutPage.isOrderComplete();
        // console.log('iscompleete statuss',isComplete);
        await expect(checkoutPage.isOrderComplete()).toBeTruthy();

        const completeMessage = await checkoutPage.getCompleteMessage();
        expect(completeMessage).toContain('Thank you for your order');

    
    });

    test('checkout with single product', async({page})=>{
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Onesie');
        await productsPage.clickShoppingCart();
        const cartPage = new CartPage(page);
        await cartPage.clickCheckout();
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillShippingInformation('Aswin','E','673016');
        await checkoutPage.clickContinue();
        await checkoutPage.clickFinish();
        const completeMessage = await checkoutPage.getCompleteMessage();
        expect(completeMessage).toBe('Thank you for your order!');
    });

    test('cannot checkout with empty cart', async({page})=>{
        const productsPage = new ProductsPage(page);
        await productsPage.clickShoppingCart();
        
        const cartPage = new CartPage(page);
        
        const itemCount = await cartPage.getCartItemCount();

        expect(itemCount).toBe(0);

        //checkout button should still be clickable but cart is empty

        await cartPage.clickCheckout();

        // should be on checkout page

        await expect(page).toHaveURL(/.*checkout-step-one.*/);    

    });

});