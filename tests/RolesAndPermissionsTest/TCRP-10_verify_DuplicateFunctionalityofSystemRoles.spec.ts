import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils";

test.skip("TCRP_10: RolesAndPermissions | Verify duplicate functionality of system roles", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  let timestamp: string;
  timestamp = getCompleteTimestamp();
  const Rolename: string = "System Role Duplicate functionality";
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
    await rolesAndPermissions.clickOnRoleActionMenu("Investment Company");
  });

  // Click on "Duplicate" menu item
  await test.step("Click on 'Duplicate' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem("Duplicate");
  });

  // Fill name and description
  await test.step("Fill name and description", async () => {
    await page.waitForLoadState("networkidle");
    await rolesAndPermissions.fillRoleAndDescription(Rolename, Description);
  });

  //Change Permissions
  await test.step("Change permissions", async () => {
    await rolesAndPermissions.setPermission("role", "update", true);
    await rolesAndPermissions.setPermission(
      "scorecard template",
      "delete",
      true
    );
    await rolesAndPermissions.setPermission("custom field", "read", true);
    await rolesAndPermissions.setPermission("tag", "delete", true);
    const result = await rolesAndPermissions.saveChanges();
  });
});
