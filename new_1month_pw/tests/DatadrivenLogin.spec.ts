import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';

const testUsers = [
    { username: 'standard_user', password: 'secret_sauce', shouldSucceed: true },
    { username: 'locked_out_user', password: 'secret_sauce', shouldSucceed: false },
    { username: 'problem_user', password: 'secret_sauce', shouldSucceed: true },
    { username: 'invalid_user', password: 'wrong_password', shouldSucceed: false }
];

test.describe('SauceDemo Login with Multiple Users',()=>{
    for(const user of testUsers){
        test(`login test for ${user.username}`,async({page})=>{
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await loginPage.login(user.username,user.password);
            if(user.shouldSucceed){
                await expect(page).toHaveURL(/inventory/);
            }else{
                const isErrorVisible = await loginPage.isErrorVisible();
                expect(isErrorVisible).toBeTruthy();
            }
        });
    }
});