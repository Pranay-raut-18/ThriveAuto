import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_24:UserPage| Verify  Filter functionality by applying a single role', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const role="Admin";
    const datafield="role"
    

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

    //Click on the Role Field and Enters a Role
    await test.step(`Click on Role field and enter roles`,async() =>{
        await userPage.clickFilterRole('Admin');
    });

    //Click on Apply Button
    await test.step(`Click on Apply Button`, async () => {
        await userPage.clickOnFilterApplyButton();
    });

    //verify that all displayed users have matching role
    await test.step(`Verify that all displayed users have matching role`, async () => {
        expect(await userPage.isAllStausActive(role,datafield)).toBeTruthy();
    });
});   