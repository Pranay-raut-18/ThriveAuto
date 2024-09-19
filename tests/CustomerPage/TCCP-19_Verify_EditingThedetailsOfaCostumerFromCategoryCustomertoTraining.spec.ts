import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_19: CustomerPage | Verify Editing the details of a Costumer from Category 'Customer' to 'Training'.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);
  
  const customerName = "James Stark";
  const customerCategory = "Training";

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

  //Click on "Edit details"
  await test.step(`Click on "Edit details"`, async () => {
    await customerPage.clickOnEditDetailsOption();
  });

  //Change Category to "Training" .
  await test.step(`Change Category to ${customerCategory} .`, async () => {
    await customerPage.selectFromDropdowns(1, customerCategory);
  });

  //Click on "Save" button
  await test.step(`Click on Save Button`, async () => {
    await customerPage.clickOnSaveButton();
  });

  //User should Verify the SUCCESS Pop-up "James Stark122" updated successfully"
  await test.step(`User should Verify the SUCCESS Pop-up ${customerName} updated successfully"`, async () => {
    await expect(page.locator(".MuiAlert-message")).toHaveText(
      `${customerName} updated successfully`
    );
  });
});
