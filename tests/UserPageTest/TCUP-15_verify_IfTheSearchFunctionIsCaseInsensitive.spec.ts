import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"

test('TCUP_15:UserPage|Verify if the search function is case-insensitive', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const mixedCaseEmail = "autoLNAME@test.com"

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

  //Search by mixed case email id
  await test.step(`Search by mixed case email id`, async () => {
    await userPage.enterNameInSearchField(mixedCaseEmail);
  });

  //verify that all displayed users have matching email. 
  await test.step(`verify that all displayed users have matching email`, async () => {
    expect.soft(await userPage.isSearchedAttributeDisplayedInUserList(mixedCaseEmail)).toBeTruthy();
  });

});