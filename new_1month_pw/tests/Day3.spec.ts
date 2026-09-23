import {test,expect} from '@playwright/test'
import path from 'path'


test.beforeEach(async({page})=>{
    await page.goto("https://demoqa.com/automation-practice-form");
});

// test('dropdown selection', async({page}) => {
//     await page.getByLabel('Choose language*').selectOption('JavaScript');
// //     await page.getByLabel('City (contains non-breaking spaces)').selectOption('San Francisco');
// //     await page.getByLabel('Product Version (select by value)').selectOption('Release 3.0');
// });

test('form testing', async({page})=>{
    await page.getByPlaceholder('First Name').fill('Aswin');
    await page.getByPlaceholder('Last Name').fill('E');
    await page.getByPlaceholder('name@example.com').fill('aswinellath1@gmail.com');

    await page.getByLabel('Male', {exact: true}).click();
    // await expect(page.getByLabel('Male')).toBeChecked();

    await page.getByPlaceholder('Mobile Number').fill('9946943642');
    await page.getByLabel('Sports', {exact:true}).click();
    await page.getByLabel('Reading', {exact:true}).click();
    await page.getByLabel('Music', {exact:true}).click();

    await expect(page.getByLabel('Sports')).toBeChecked();
    await page.getByPlaceholder('Current Address').fill('This is my address');

    await page.locator('#dateOfBirthInput').fill('15 Sep 2026');




    await page.locator('#state').click();  //using locator ids
    await page.locator('#react-select-3-input').fill('Uttar Pradesh');
    await page.getByText('Uttar Pradesh', {exact:true}).last().click(); //last()Targets the visible option whenthere are more than one matching elements, which can cause strict mode violation.

    await page.locator('#city').click();
    await page.locator('#react-select-4-input').fill('Agra');
    await page.getByText('Agra',{exact:true}).last().click();
//---------------------------------------------------------------------------------
    
    //Using Combobox role.

    // await page.getByRole('combobox').nth(2).fill('NCR');
    // await page.getByText('NCR',{exact:true}).last().click();

    // await page.getByRole('combobox').nth(3).fill('Delhi');
    // await page.getByText('Delhi',{exact:true}).last().click();




// await page.locator('#city').click();
    // await page.getByText('#).click();
    
    

    await page.locator('#uploadPicture').setInputFiles(path.join(__dirname, '../test data/Snapshot_2026-09-08_16-12-50.png'));
    

    await page.getByRole('button',{name:'Submit'}).click();

    await expect(page.getByText('Thanks for submitting the form')).toBeVisible();

});





