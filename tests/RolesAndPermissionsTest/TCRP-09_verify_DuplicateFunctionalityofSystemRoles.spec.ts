import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils";

test("TCRP_09: RolesAndPermissions | Verify duplicate functionality of system roles", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  let timestamp: string;
  timestamp = getCompleteTimestamp();
  const Rolename: string = `AutoRolename${timestamp}`;
  const Description: string = `AutoDescription${timestamp}`;

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  // Go to Admin Portal
  await test.step("Go to Admin Portal Customer tab", async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Click on Roles and Permissions Tab
  await test.step("Click on Roles and Permissions Tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
  });

  //Click on action menu according to choice
  await test.step("Click on action menu for choice role", async () => {
    await rolesAndPermissions.clickOnRoleActionMenu("Admin");
  });

  // Click on "Duplicate" menu item
  await test.step("Click on 'Duplicate' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem("Duplicate");
  });

  // Fill name and description
  await test.step("Fill name and description", async () => {
    await page.waitForLoadState("networkidle");
    await rolesAndPermissions.fillRoleAndDescription(Rolename, Description);
    // Dynamically select/unselect permissions
    await rolesAndPermissions.setPermission("user", "delete", false);
    await rolesAndPermissions.setPermission("user", "update", false);
    await rolesAndPermissions.setPermission("user", "create", false);
    await rolesAndPermissions.setPermission(
      "Impersonate user",
      "update",
      false
    );
    await rolesAndPermissions.setPermission("role", "delete", false);
    await rolesAndPermissions.saveChanges();
  });
});
