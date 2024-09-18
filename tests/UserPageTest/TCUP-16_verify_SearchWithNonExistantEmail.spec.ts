import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"

test('TCUP_16:UserPage|Verify Searching with  Non-Existing Email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const nonExistantemail = "autoLname@test.com"

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

  //Search by Non existant email id
  await test.step(`Search by Non existant email id`, async () => {
    await userPage.enterNameInSearchField(nonExistantemail);
    //await page.waitForTimeout(1000);
  });

  //verify  no user is displayed in the user list
  await test.step(`Verify no user is displayed in the user list`, async () => {
    expect.soft(await userPage.isNoResultsVisible()).toBeTruthy();
  });

});