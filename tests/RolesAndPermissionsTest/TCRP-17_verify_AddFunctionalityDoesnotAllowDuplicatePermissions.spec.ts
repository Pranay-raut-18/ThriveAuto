import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCRP_01: RolesAndPermissions | Verify default display", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  const Rolename: string = "Test";
  const Description: string = "TestDesctiption";

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  // Go to Admin Portal
  await test.step("Go to Admin Portal Customer tab", async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Clicks on Roles and Permissions tab
  await test.step("Verify roles in Roles and Permissions tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
  });
  //Select a role to duplicate with similar permissions and fill name and description
  await test.step("Click on action menu for choice role", async () => {
    await rolesAndPermissions.clickOnRoleActionMenu("Admin");
    await rolesAndPermissions.clickOnMenuItem("Duplicate");
    await rolesAndPermissions.fillRoleAndDescription(Rolename, Description);
    await rolesAndPermissions.saveChangesWithoutCheck();
    await page.pause();
  });
});
