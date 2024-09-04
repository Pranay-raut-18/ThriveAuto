import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"

test('TCUP_10:UserPage|Verify searching by only First name ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const Firstname = "Jhon"

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Portal 
  await test.step(`Go to Admin Portal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  //Clear preapplied filter
  await test.step(`Clear preapplied filter`, async () => {
    await userPage.clearFilter();

  });

  //Search by name
  await test.step(`Search by name`, async () => {
    await userPage.enterNameInSearchField(Firstname);
  });

  //verify that all displayed users have the matching first name
  await test.step(`Verify that all displayed users have the matching first name`, async () => {
    expect.soft(await userPage.isSearchedAttributeDisplayedInUserList(Firstname)).toBeTruthy();
  });

});    