import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_62:UserPage|Verify Matching Roles Display in Role Dropdown When Entering a Role in the Create User Form on User Page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const reqRole = "Admin";

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Potal 
  await test.step(`Go to Admin Potal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();

  });

  //Click on Adduser icon
  await test.step(`Click on Adduser icon`, async () => {
    await userPage.clickOnAddUserIcon();
  });

  //Click on Role Feild and Enter a valid role
  await test.step(`Click on Role Feild and Enter a valid role`, async () => {
    await userPage.clickOnRoleButton();
    await userPage.roleField.fill(reqRole);
  });

  //Verify that all the matching roles are displayed in the dropdown
  await test.step(`Verify that all the matching roles are displayed in the dropdown`, async () => {
    let contains = (await userPage.getRolesFromDropdown()).every(role => role.toLowerCase().includes(reqRole.toLowerCase()));
    expect.soft(contains).toBe(true);
  });

});