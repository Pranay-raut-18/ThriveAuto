import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_21: CustomerPage | Verify Success pop-up appears after Editing the Primary Contact of a Costumer.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  const customerName = `James Stark122`;
  const fName = "Rosy";
  const lName = "Stark";
  const eMail = "rosystark@thrive.com";

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

  //Click on "Edit Primary Contact Details Option"
  await test.step(`Click on "Edit details"`, async () => {
    await customerPage.clickOnEditPrimaryContactOption();
  });

  //Enter First Name
  await test.step(`Enter First Name`, async () => {
    await customerPage.enterPrimaryContactFirstName(fName);
  });

  // Enter Last Name
  await test.step(`Enter Last Name`, async () => {
    await customerPage.enterPrimaryContactLastName(lName);
  });

  // Enter Email
  await test.step(`Enter Email`, async () => {
    await customerPage.enterPrimaryContactEmail(eMail);
  });

  // Click on the Button "Invite Primary Contact"
  await test.step(`Click on the Button "Invite Primary Contact"`, async () => {
    await customerPage.clickOnInvitePrimaryContact();
  });

  // Verify SUCCESS Pop-up appeared
  await test.step(`Verify SUCCESS Pop-up appeared`, async () => {
    await expect(page.locator(".MuiAlert-message")).toContainText(
      `${fName} ${lName} invited to ${customerName} successfully`
    );
  });
});
