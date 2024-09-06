import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_04:CustomerPage | Verify search functionality by Name", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);
  const customerName = "alanis";
  const dataField = "name";

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    page.waitForURL;
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Portal
  await test.step(`Go to Admin Portal`, async () => {
    await homePage.clickOnGoToAdminPortal();
    await expect(page).toHaveURL("https://thrive.thrive-dev.com/admin/users");
  });

  //Click on Customer tab
  await test.step(`Click Customer tab`, async () => {
    await userPage.clickOnCustomerTab();
    await expect(page).toHaveURL(
      "https://thrive.thrive-dev.com/admin/customers"
    );
  });

  //Click on Search field.
  await test.step(`Click on Search field.`, async () => {
    await customerPage.clickOnSearchFeild();
  });

  //Enter Name
  await test.step(`Enter Name`, async () => {
    await customerPage.enterCustomerNameinSearchFeild(customerName);
    await page.waitForSelector(".css-opb0c2");
  });

  //Verify all the records of Customer Searched by name
  await test.step(`Verify all the records of Customer Searched by name `, async () => {
    const records = await customerPage.getAllRecordofaParticularColoum(
      dataField
    );
    await expect(records).toContain(customerName);
  });
});
