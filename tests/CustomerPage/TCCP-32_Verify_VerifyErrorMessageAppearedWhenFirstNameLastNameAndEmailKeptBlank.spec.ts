import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_32: CustomerPage | Verify Error message appeared when FirstName, LastName and Email kept blank ", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  const customerName = `PW Customer 498`;
  const fName = "";
  const lName = "";
  const eMail = "";

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

  //search for ${customerName} and Click on Option button
  await test.step(`search for ${customerName} and Click on Option button`, async () => {
    await customerPage.enterCustomerNameinSearchFeild(customerName);
    await customerPage.clickOnOptionButton();  
  });

  //Click on Add to primary Contact option
  await test.step(`Click on Add to primary Contact option`, async () => {
    await customerPage.clickOnAddPrimaryContactOption()
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
  
  // Enter First Name
  await test.step(`Enter First Name`, async () => {
    await customerPage.enterPrimaryContactFirstName(fName);
  
    await expect(page.getByText("Please enter a first name")).toHaveText("Please enter a first name");
    await expect(page.getByText("Please enter a last name")).toHaveText("Please enter a last name");
    await expect(page.getByText("Please enter a valid email")).toHaveText("Please enter a valid email");
  });

});
