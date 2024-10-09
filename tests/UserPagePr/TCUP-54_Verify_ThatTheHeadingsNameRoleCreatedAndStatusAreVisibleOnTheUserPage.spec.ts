import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_54:UserPage | verify that the headings "Name", "Role", "Created", and "Status" are visible on the User Page.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
    });

    //Verify if the "Name" heading is visible.
    await test.step(`Verify if the "Name" heading is visible.`, async () => {
        await expect(page.locator(`//div[contains(text(),'Name')]`)).toBeVisible();
    });

    //Verify if the "Role" heading is visible.
    await test.step(`Verify if the "Role" heading is visible.`, async () => {
        await expect(page.locator(`//div[contains(text(),'Role')]`).first()).toBeVisible();
    });

    //Verify if the "Created" heading is visible.
    await test.step(`Verify if the "Created" heading is visible.`, async () => {
        await expect(page.locator(`//div[contains(text(),'Created')]`)).toBeVisible();
    });

    //Verify if the "Status" heading is visible.
    await test.step(`Verify if the "Status" heading is visible.`, async () => {
        await expect(page.locator(`//div[contains(text(),'Status')]`)).toBeVisible();
    });


});    