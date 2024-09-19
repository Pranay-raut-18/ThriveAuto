import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_42:CustomerPage | Verify Status Filter is 'Active' by default on Customers page", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);
  
  const status = "Active";
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

  //Verify all the records of Customer by-default Status is "Active"
  await test.step(`Verify all the records of Customer by-default Status is ${status}`, async () => {
    const records = await customerPage.getAllRecordofaParticularColoum(
      dataField
    );
    await expect(records).toContain(status);
  });
});
