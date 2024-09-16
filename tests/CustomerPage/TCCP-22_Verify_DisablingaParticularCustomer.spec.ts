import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_22: CustomerPage | Verify user can Disable a Particular Customer", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  const customerName = `James Stark122`; //@customeName should be Enabled.
  const option = `Disable`; 

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    page.waitForURL;
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Portal
  await test.step(`Go to Admin Portal`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  //Click on Customer tab
  await test.step(`Click Customer tab`, async () => {
    await userPage.clickOnCustomerTab();
  });

  //Remove the Filter "Status Active" by clicking (X) button
  await test.step(`Remove the Filter "Status Active" by clicking (X) button`, async () => {
    await customerPage.removePreFilterStatus();
  });

  // From the table search for Customer Name and click ":" button for costumer
  await test.step(`From the table search for ${customerName} and click ":" button for costumer`, async () => {
    await customerPage.enterCustomerNameinSearchFeild(customerName);
    await page.waitForSelector(".css-opb0c2");
    await customerPage.clickOnOptionButton();
  });

  //Click on disabled Option and verify the Alert Appear.
  await test.step(`Click on disabled option and verify the Alert Appear.`, async () => {
    await page.pause();
    await customerPage.clickOnDesiredOption(option);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("#customer-disable-dialog-description")).toHaveText(`Are you sure you want to disable ${customerName}?`);
  });
  
  //Click on Alert disabled button and verify the Success Pop-Up Appear.
  await test.step(`Click on Alert disabled button and verify the Alert Appear.`, async () => {
    await customerPage.clickOnAcceptAlertButton();
    await expect(page.locator(".MuiAlert-message")).toHaveText(`${customerName} customer successfully disabled`);
  });
  
});
