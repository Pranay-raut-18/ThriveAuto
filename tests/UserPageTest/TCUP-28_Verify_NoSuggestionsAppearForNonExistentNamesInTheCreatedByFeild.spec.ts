import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_28:UserPage|Verify No Suggestions appear for Non-Existent Names in the "created by" feild', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const datafield="createdAt"
    const value="Non-Existant";

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
    });

    //Clear preapplied filter
    await test.step(`Clear preapplied filter`, async () => {
    await userPage.clearFilter();
    });

    //Click on filter icon 
    await test.step(`Click on filter icon`, async () => {
        await userPage.clickOnFilterButton();
    });

    //Verify if the createdBy field do not show any suggestions for an non-existand created by name
    await test.step(`Verify if the createdBy field do not show any suggestions for an non-existand created by name`, async () => {
        expect.soft(await userPage.enterCreateFeildValue(value)).toBeFalsy();
    });    

});