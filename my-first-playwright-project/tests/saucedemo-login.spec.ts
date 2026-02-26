import { test, expect } from '@playwright/test';
import { SauceDemoUsers } from '../utils/test-data';

test('login with environment variables', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    // Use credentials from .env file
    await page.locator('#user-name').fill(SauceDemoUsers.standard.username);
    await page.locator('#password').fill(SauceDemoUsers.standard.password);
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});