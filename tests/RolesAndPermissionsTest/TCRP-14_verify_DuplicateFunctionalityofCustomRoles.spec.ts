import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils";

test.skip("TCRP_14: RolesAndPermissions | Verify duplicate functionality of custom roles", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  let timestamp: string;
  timestamp = getCompleteTimestamp();
  const roletoduplicate: string = "AutoRolename";
  const newRolename: string = `AutoRolename${timestamp}`;
  const menuItemName = "Duplicate";
  const Description = `AutoRoleDescription${timestamp}`;

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
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole(roletoduplicate);
  });

  // Wait for the role row to be present and visible
  await test.step(`Wait for the role row: ${roletoduplicate}`, async () => {
    await rolesAndPermissions.waitForRoleToAppear(roletoduplicate);
  });

  // Locate the row with the desired role name and click the action menu button
  await test.step("Click on the action menu for the searched role", async () => {
    await rolesAndPermissions.clickOptionsMenuofSearchedRole(roletoduplicate);
  });
  // Fill name and description
  await test.step("Fill name and description", async () => {
    await rolesAndPermissions.clickOnMenuItem(menuItemName);
    await rolesAndPermissions.fillRoleAndDescription(newRolename, Description);
    await rolesAndPermissions.setPermission("impersonate user", "update", true);
    await rolesAndPermissions.setPermission("tag", "delete", false);
    await rolesAndPermissions.setPermission("tag", "create", true);
    await rolesAndPermissions.setPermission("tag", "update", true);
    await rolesAndPermissions.setPermission("note", "delete", true);
    await rolesAndPermissions.saveChanges();
    const result = await rolesAndPermissions.CheckifSucessMessageisVisible();
    expect(result).toBeTruthy();
  });
});
