import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_30:UserPage|Verify that the Created By dropdown shows all matching names based on the input in the Created By field.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const name1='MK Admin 0.12';
    let roles:string[];

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
         roles=await userPage.getFilterCreatedByValues(name1);
    });

    

    //Verify if the dropdown displays all the matching names
    await test.step(`Verify if the dropdown displays all the matching names`,async()=>{
        const allContainName = roles.every(role => role.includes(name1));
        expect.soft(allContainName).toBe(true);
    });

});