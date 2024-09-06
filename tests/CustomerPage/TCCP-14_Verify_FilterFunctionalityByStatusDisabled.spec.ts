import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_14:CustomerPage | Verify filter functionality by Status 'Disabaled' ", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);
  const status = "Disabled";
  const dataField = "customerStatus";

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

  //Click on Filter Option (Symbol).
  await test.step(`Click on Filter Option (Symbol). `, async () => {
    await customerPage.clickOnFilterOption();
  });

  //Select the Status to "Disabled"
  await test.step(`Select the Status to "Disabled"`, async () => {
    await customerPage.selectFromDropdowns(2,status);
  });

  //Click On "Apply" Button
  await test.step(`Click On "Apply" Button`, async () => {
    await customerPage.clickOnApplyButton();
  });

  //Verify all the records of Customer Filtered by Status is "Disabled"
  await test.step(`Verify all the records of Customer Filtered by Status is ${status}`, async () => {
    const records = await customerPage.getAllRecordofaParticularColoum(
      dataField
    );
    await expect(records).toContain(status); 
  });
});
