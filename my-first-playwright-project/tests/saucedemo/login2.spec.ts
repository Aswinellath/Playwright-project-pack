import{ test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';

test('Successful login redirects to products page', async ({ page }) => {

    //ARRANGE - Set up the test

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    //ACT - Perform the action

    await loginPage.login('standard_user', 'secret_sauce');

    //ASSERT - Verify the results

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const productsPage = new ProductsPage(page);

    await expect(productsPage.pageTitle).toHaveText('Products');

    //Verify we see products

    const productCount = await productsPage.getProductCount();

    expect(productCount).toBeGreaterThan(0);

});