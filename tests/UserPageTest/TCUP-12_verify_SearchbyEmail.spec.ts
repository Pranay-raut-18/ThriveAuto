import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"

test('TCUP_12:UserPage|Verify searching by email ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const email ="pw_adminuser506@example.com";
  const datafield="name";

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

  //Search by email
  await test.step(`Search by email`, async () => {
    await userPage.enterNameInSearchField(email);
  });

  //verify that all displayed users have matching email
  await test.step(`verify that all displayed users have matching email`, async () => {
    expect.soft(await userPage.isSearchedAttributeDisplayedInUserList(email,datafield)).toBeTruthy();
  });

});