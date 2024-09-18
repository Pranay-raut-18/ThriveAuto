import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_60:UserPage| Verify that the "Status: Active" filter is applied by default on the "Users" page, and confirm the visibility of the corresponding filter chip', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    let value="Active";
    let datafield="status";
    

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
    });

    //Verify status active filter chip is visible
    await test.step(`Verify status active filter chip is visible`, async () => {
        expect.soft(await userPage.isStatusActiveChipVisible()).toBeTruthy();
    });

    //Verify that filter status is enabled by default
    await test.step(`Verify that filter status is enabled by default`, async () =>{
        expect(await userPage.isAllStausActive(value,datafield)).toBeTruthy();
    });

});
