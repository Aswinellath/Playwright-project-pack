import{test,expect} from '@playwright/test'

test.beforeEach(async ({page})=>{
    await page.goto('https://www.saucedemo.com/');
});

test('Valid user login', async({page})=>{
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();
    await expect(page.getByText('Products')).toBeVisible();
});

test('Invalid user login', async({page})=>{
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
})




