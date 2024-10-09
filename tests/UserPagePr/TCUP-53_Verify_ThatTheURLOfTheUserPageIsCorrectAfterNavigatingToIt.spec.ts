import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_53:UserPage | verify that the URL of the User page is correct after navigating to it.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
        await page.waitForLoadState('networkidle');
    });

    //Verify that the URL of the page matches the expected URL.
    await test.step(`Verify that the URL of the page matches the expected URL.`, async () => {
        expect(page.url()).toBe("https://thrive.thrive-qa.com/admin/users");
    });
});    