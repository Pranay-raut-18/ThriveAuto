import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_29:UserPage| Verify Clearing "Created By" Field Resets Suggestions', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const name1='MK Admin 0.12', name2='Playwright Test Automation';
    let roles1:string[];
    let roles2:string[];

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
    });

    //Click on filter icon 
    await test.step(`Click on filter icon`, async () => {
        await userPage.clickOnFilterButton();
    });

    //Click on createdBy field,enter a value and get all the suggested name from the dropdown
    await test.step(`Click on createdBy field,enter a value and get all the suggested name from dropdown`,async() =>{
         roles1=await userPage.getFilterCreatedByValues(name1);
    });

    //Clear the name entered in the created By field ,enter a new name and  get all the suggested name from the dropdown
    await test.step(`Clear the name , enter a new name and get all the suggested names`,async()=>{
            await userPage.clearFilterCreatedByField();
            roles2=await userPage.getFilterCreatedByValues(name2);
    });

    //Verify if entering one name,clearing it and filling a new name reset the suggestion and gives new relevant suggestions
    await test.step(`Verify if entering one name,clearing it and filling a new name resets the suggestion`,async()=>{
            expect.soft(roles1).not.toEqual(roles2);
    });

});