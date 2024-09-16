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
    await rolesAndPermissions.clickOnRoleActionMenu("Engagement Coordinator");
  });

  // Click on "Duplicate" menu item
  await test.step("Click on 'Duplicate' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem("Duplicate");
  });

  // Fill name and description
  await test.step("Fill name and description", async () => {
    await page.waitForTimeout(2000);
    await rolesAndPermissions.fillRoleAndDescription(Rolename, Description);
    await rolesAndPermissions.setPermission("tag", "delete", false);
    await rolesAndPermissions.setPermission("tag", "create", true);
    await rolesAndPermissions.setPermission("tag", "update", true);
    await rolesAndPermissions.setPermission("Note", "delete", true);
    await page.pause();
    await rolesAndPermissions.saveChanges();
    await page.pause();
    expect(page.locator(".MuiAlert-message")).toBe(true);
  });
});
