import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_29:CustomerPage | Verify Logout button.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Portal
  await test.step(`Go to Admin Portal`, async () => {
    page.waitForURL;
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
  
  // Click on Account user.
  await test.step(`Click on Account user.`, async () => {
    await customerPage.clickOnAccountUserButton();
  });

  // Click on Log Out.
  await test.step(`Click on Log Out Button.`, async () => {
    await customerPage.clickOnLogOutButton();
    await page.waitForLoadState("networkidle");
  });

  // Verify User came to the Log In page by URL
  await test.step(`Verify User came to the Log In page by URL`, async () => {
    expect(page.url()).toBe("https://thrive.thrive-dev.com/login");
  });

});