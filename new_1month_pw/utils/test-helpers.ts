import {Page} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage'

import { ProductsPage } from '../pages/ProductsPage';

import { SauceDemoUsers} from '../utils/saucedemo-data';

export async function loginAsStandardUser(page: Page){
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(SauceDemoUsers.standard.username,SauceDemoUsers.standard.password);
};

export async function addProductsToCart(page: Page, products: string[]){
    const productsPage = new ProductsPage(page);
    for(const product of products){
        await productsPage.addProductToCartByName(product);

    }
}





