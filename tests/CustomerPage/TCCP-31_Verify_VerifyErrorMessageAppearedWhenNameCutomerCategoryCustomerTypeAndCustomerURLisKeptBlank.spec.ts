import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_31: CustomerPage | Verify Error message appeared when Name, customer category, customer type and customer URL is kept blank.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  const name = "";

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

  // Click on Add Customer button (+ Customer)
  await test.step(`Click on Add Customer button (+ Customer)`, async () => {
    await customerPage.clickOnAddCustomerButton();
  });

  // Enter Name input field
  await test.step(`Enter Name input field`, async () => {
    await customerPage.enterCustomerNameinNameFeild(name);
  });
  
  // Click Customer Type drop down
  await test.step(`Click Customer Type drop down`, async () => {
    await customerPage.clickOnDropDown(0);
  });
  
  // Click Customer category drop down
  await test.step(`Click Customer Category drop down`, async () => {
    await customerPage.clickOnDropDown(1);
  });
  
  // Click Customer URL
  await test.step(`Click Customer URL`, async () => {
    await customerPage.clickOnDropDown(2);
  });
  
  // Enter Name input field
  await test.step(`Enter Name input field`, async () => {
    await customerPage.enterCustomerNameinNameFeild(name);
    
    await expect(page.getByText("Please enter a customer name")).toHaveText("Please enter a customer name");
    await expect(page.getByText("Please select a customer type")).toHaveText("Please select a customer type");
    await expect(page.getByText("Please select a customer category")).toHaveText("Please select a customer category");
    await expect(page.getByText("Please enter a customer URL")).toHaveText("Please enter a customer URL");
  });
});
