import { test, expect } from '@playwright/test';
 
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
 
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';

test.describe('SauceDemo Products Tests', () => {
 
let loginPage: LoginPage;
 
let productsPage: ProductsPage;
 
test.beforeAll(async () => {
 
console.log('Starting Products test suite');
 
});

test.beforeEach(async ({ page }) => {
 
loginPage = new LoginPage(page);
 
productsPage = new ProductsPage(page);

// Login before each test
 
await loginPage.goto();
 
await loginPage.login('standard_user', 'secret_sauce');
 
});

test.afterEach(async ({ page }, testInfo) => {
 
if (testInfo.status !== testInfo.expectedStatus) {
 
await page.screenshot({
 
path: `test-results/${testInfo.title}-failure.png`
 
});

}

});

test.afterAll(async () => {
 
console.log('Products test suite completed');
 
});

test('displays all products', async ({ page }) => {
 
const productCount = await productsPage.getProductCount();
 
expect(productCount).toBe(6);
 
});

test('can add product to cart', async ({ page }) => {
 
await productsPage.addProductToCartByName('Sauce Labs Backpack');
 
const cartCount = await productsPage.getCartItemCount();
 
expect(cartCount).toBe('1');
 
});
 
});
