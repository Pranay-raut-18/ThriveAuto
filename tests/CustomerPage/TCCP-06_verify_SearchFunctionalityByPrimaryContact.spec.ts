import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from '../../Pages/CustomerPage';
import { Url, EmailAddress, Password } from "../../utils/config-utils"

test("TCCP_06:CustomerPage | Verify search functionality by Primary Contact", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userPage = new UserPage(page);
    const homePage = new HomePage(page);
    const customerPage = new CustomerPage(page);
    const primaryContact = "Jill Hughes";

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);

    });

    //Go to Admin Portal
    await test.step(`Go to Admin Portal`, async () => {
        page.waitForURL;
        await homePage.clickOnGoToAdminPortal();
    })

    //Click on Customer tab
    await test.step(`Click Customer tab`, async () => {
        await userPage.clickOnCustomerTab();
    })

    //Click on Search field.
    await test.step(`Click on Search field.`, async () => {
        await customerPage.clickOnSearchFeild();
    })

    //Enter Primary Contact
    await test.step(`Enter Primary Contact`, async () => {
        await customerPage.enterName(primaryContact);
        await page.waitForSelector(".css-opb0c2");
    })

    //verifying that Primary Contact is visible in the table
    await test.step(`verifying that Primary Contact is visible in the table`, async () => {
        await expect(await customerPage.isPrimaryContactVisible(primaryContact)).toBeVisible();
    })

})
