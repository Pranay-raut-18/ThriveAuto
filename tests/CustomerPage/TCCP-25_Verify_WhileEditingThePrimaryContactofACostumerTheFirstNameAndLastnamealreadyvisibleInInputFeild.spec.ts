import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_25: CustomerPage | Verify while Editing the Primary Contact of a Costumer the Fname and Lnamealready visible in input Feild", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  const customerName = `JamesCustomer`;

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

  // Click on Edit Primary Contact.   
  await test.step(`Click on Edit Primary Contact.`, async () => {
    await customerPage.clickOnEditPrimaryContactOption();
  });
  
  // Verify First Name, Last Name already exist of a customer.()
  await test.step(`Click on Edit Primary Contact.`, async () => {
    const fName= customerName.split(" ")[0];
    await expect.soft(page.locator("[name='firstName']")).toHaveText(`${fName}`);
    const lName= customerName.split(" ")[1];
    await expect(page.locator("[name='lastName']")).toHaveText(`${lName}`);
  });

});
