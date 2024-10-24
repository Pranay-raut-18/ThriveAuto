import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"

test('TCUP_14:UserPage|Verify searching by Invalid email format', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const partialemail = "AutoLname@testcom";

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Potal 
  await test.step(`Go to Admin Potal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  //Clear preapplied filter
  await test.step(`Clear preapplied filter`, async () => {
    await userPage.clearFilter();
  });

  //Search by Invalid email format
  await test.step(`Search by invalid email format`, async () => {
    await userPage.enterNameInSearchField(partialemail);
  });

  //verify  no user is displayed in the user list
  await test.step(`Verify no user is displayed in the user list`, async () => {
   expect.soft(await userPage.isNoResultsVisible()).toBeTruthy();
  });

});