import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("Roles and Permissions Tab functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  // Go to Admin Portal
  await test.step("Go to Admin Portal Customer tab", async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Verify default display of roles and permissions tab
  await test.step("Verify roles in Roles and Permissions tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();

    const roles = await rolesAndPermissions.getAllRoles();
    expect(roles).toBeTruthy();
  });

  // Verify URL of the roles and permissions tab
  await test.step("Verify URL of the roles and permissions tab", async () => {
    await rolesAndPermissions.verifyPageUrl();
  });

  // Verify search by role in search bar
  await test.step("Verify search by role in searchbar", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.isRoleDisplayed("admin");
  });
  //Verify search by partial role in search bar
  await test.step("Verify search by Partial role in search bar ", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.isRoleDisplayed("Admi");
  });
});
