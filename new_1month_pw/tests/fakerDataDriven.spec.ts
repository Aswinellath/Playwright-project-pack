import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';

import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';


test.describe('Saucedemo Checkout with Faker',() => {
    test('checkout with random user data',async({page})=>{
        //Generate random data
        const checkoutData={
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
        //Login and add products (setup code omitted for brevity)
        // ...
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user','secret_sauce');

        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Bike Light');
        await productsPage.clickShoppingCart();

        const cartPage = new CartPage(page);
        await cartPage.clickCheckout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillShippingInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickContinue();

        //verify we can proceed with random data
        
        await expect(page).toHaveURL(/checkout-step-two/);
    });
    test('checkout with multiple random users', async({page})=>{
        for (let i = 0; i<5; i++){
            const userData = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                postalCode: faker.location.zipCode('####')
            };

            console.log(`Test ${i+1}: ${userData.firstName} ${userData.lastName}`);

            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login('standard_user','secret_sauce');

            const productsPage = new ProductsPage(page);
            await productsPage.addProductToCartByName('Sauce Labs Backpack');
            await productsPage.addProductToCartByName('Sauce Labs Bike Light');
            await productsPage.clickShoppingCart();
            
            const cartPage = new CartPage(page);
            await cartPage.clickCheckout();

            const checkoutPage = new CheckoutPage(page);
            await checkoutPage.fillShippingInformation(userData.firstName, userData.lastName, userData.postalCode);
            await checkoutPage.clickContinue();
            await checkoutPage.clickFinish();

            await expect(page).toHaveURL(/checkout-complete/);
        }
    });
});
