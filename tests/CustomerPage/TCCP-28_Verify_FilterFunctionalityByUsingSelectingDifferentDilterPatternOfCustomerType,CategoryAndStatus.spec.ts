import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_28:CustomerPage | Verify filter functionality by using Selecting different filter pattern of Customer Type, Category and status.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  const CustomerType = "Executive Search Firm";
  const dataFieldcustomerType = "customerType";
  const CustomerCategory = "Search Transfer";
  const status = "Pending";
  const dataFieldcustomerStatus = "customerStatus";

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

  //Select the Customer Type to "Executive Search Firm"
  await test.step(`Select the Customer Type to "${CustomerType}"`, async () => {
    await customerPage.selectFromDropdowns(0,CustomerType);
  });

  //Select the Customer Category to "Search Transfer"
  await test.step(`Select the Customer Category to "${CustomerCategory}"`, async () => {
    await customerPage.selectFromDropdowns(1,CustomerCategory);
  });

  //Select the Status to "Pending"
  await test.step(`Select the Status to "${status}"`, async () => {
    await customerPage.selectFromDropdowns(2,status);
  });

  //Click On "Apply" Button
  await test.step(`Click On "Apply" Button`, async () => {
    await customerPage.clickOnApplyButton();
  });

  //Verify all the records of  Customer Type, Category and status.
  await test.step(`Verify all the records of  ${CustomerType}, ${CustomerCategory} and ${status}.`, async () => {
    const recordsCustomerType = await customerPage.getAllRecordofaParticularColoum(dataFieldcustomerType);
    expect(recordsCustomerType).toContain(CustomerType); 
    
    const records = await customerPage.getAllRecordofaParticularColoum(dataFieldcustomerStatus);
    expect(records).toContain(status); 
  });
});
