import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_34:UserPage|Verify that only users with the selected Status are displayed when the Status filter is applied', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const value='Invited';
    const chip1="Status: Invited";
    const datafield="status";
    let statusValues:string[];
    

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

    //Click on status Field and select a status
    await test.step(`Click on status Field and select a status`, async () => {
        await userPage.clickFilterStatusField(value);
    });

    //Click on Apply Button
    await test.step(`Click on Apply Button`, async () => {
        await userPage.clickOnFilterApplyButton();
        
    });

    //Get all the value from the status column
    await test.step(`Get all the value from the status column`, async () => {
        statusValues = await userPage.getFilterValues(datafield);
    });

    //Verify that  the status chip is visible
    await test.step(`Verify that  the status chip is visible`, async () => {
        expect.soft(await userPage.isFilterChipsVisible(chip1)).toBeTruthy()
    });
    
    //Verify that the status field displays the correct value based on the applied filter
    await test.step(`Verify that the status field displays the correct value based on the applied filter`, async () => {
        const allContainName = statusValues.every(status => status.includes(value));
        expect.soft(allContainName).toBe(true);        
    }); 


});    