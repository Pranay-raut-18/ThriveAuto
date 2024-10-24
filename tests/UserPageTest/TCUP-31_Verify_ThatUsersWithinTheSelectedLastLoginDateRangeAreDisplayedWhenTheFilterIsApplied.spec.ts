import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_31:UserPage|Verify that users within the selected Last Login date range are displayed when the filter is applied.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const fromDate = new Date("Jul 1, 2024");
    const toDate = new Date("Aug 1, 2024");
    

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

    //Select the dates in the Last Login date picker
    await test.step(`Select the dates in the Last Login date picker`, async () => {
        await userPage.SelectDate("July","1",0);
        await userPage.SelectDate("August","1",1);
        
    });

    //Click on Apply Button
    await test.step(`Click on Apply Button`, async () => {
        await userPage.clickOnFilterApplyButton();
    });

    //Verify that only users within the selected Last logIn dates are only visibile
    await test.step(`Verify that only users within the selected Last logIn dates are only visibile`, async () => {
      expect (await userPage.getAndCompareDates("status",fromDate, toDate)).toBe(true);
    });



});    