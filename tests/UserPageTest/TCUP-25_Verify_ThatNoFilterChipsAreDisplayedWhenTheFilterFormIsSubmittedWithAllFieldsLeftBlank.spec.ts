import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_25:UserPage| Verify that no filter chips are displayed when the filter form is submitted with all fields left blank.', async ({ page }) => {
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
    
    //Click on filter reset button
    await test.step(`Click on filter reset button`, async () => {
        await userPage.clickOnFilterResetButton();
    });
    
    //Verify that no filter chips are visible
    await test.step(`Verify that no filter chips are visible`, async () => {
        expect (userPage.isAllFilterChipsRemoved).toBeTruthy();
    });

    
    
});   