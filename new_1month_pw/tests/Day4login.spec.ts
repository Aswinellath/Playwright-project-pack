import {test,expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage'


test.describe('Saucedemo login tests', ()=>{

    test.beforeEach('login',async({page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    })

test('user can login', async({page})=> {
    const loginPage = new LoginPage(page);
    // await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');
    await expect(page.locator('.title')).toHaveText('Products');
});

test('login with invalid credentials', async({page})=>{
    const loginPage = new LoginPage(page);
    // await loginPage.goto();
    await loginPage.login('invalid_user','wrong_password');
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
});

test('login fails with locked out user', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user','secret_sauce');
    const errorText = await loginPage.getErrorMessage();
    await expect(errorText).toContain('Sorry, this user has been locked out');
    
});

test('can clear error message', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid_user','wrong');
    await expect(loginPage.errorMessage).toBeVisible();
});

});




