import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_09:UserPage|Verify searching by full name', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const Fullname = "Jhon White870";
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

  //Search by name
  await test.step(`Search by name`, async () => {
    await userPage.enterNameInSearchField(Fullname);
  });

  //Verify the searched Name is visible on the User list
  await test.step(`Verify the searched Name is visible on the User list`, async () => {
    expect(await userPage.isSearchedAttributeDisplayedInUserList(Fullname,datafield)).toBeTruthy();
  });

});      