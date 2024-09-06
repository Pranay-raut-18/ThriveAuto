import { test,expect} from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_16: CustomerPage | Verify After entering the details of Name, Type, Category the Costumer URL is self generated.", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);
  
  const customerName="Christiana Author"
  const customerType="Enterprise"
  const customerCategory="Customer"

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

  // Enter Name in the Name Feild
  await test.step(`Enter Name in the Name Feild`, async () => {
    await customerPage.enterCustomerNameinNameFeild(customerName)
  });
  
  // Select the Customer Type
  await test.step(`Select the Customer Type`, async () => {
    await customerPage.selectFromDropdowns(0,customerType)
});

// Select the Customer Category.
await test.step(`Select the Customer Category.`, async () => {
    await customerPage.selectFromDropdowns(1,customerCategory);
  });

  // Verify  that Customer URL is self Generated
  await test.step(`Verify Customer URL is self Generated`, async () => { 
    const cusURL= customerName.toLowerCase().replace(/\s+/g, ''); 
    await expect(page.locator('input[name="subdomain"]')).toHaveValue(cusURL);
  });
  
});
