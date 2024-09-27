import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils";
import { time, timeStamp } from "console";

test.skip("TCRP_15: RolesAndPermissions | Verify add functionality of custom roles", async ({
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
  //Click on Add "+Roles" custom roles
  await test.step("Click on add custom roles button", async () => {
    await rolesAndPermissions.AddNewRoleBtnClick();
  });
  //Fill auto name and auto description
  await test.step("Fills auto name and auto description", async () => {
    await page.waitForLoadState("networkidle");
    await rolesAndPermissions.fillRoleAndDescription(Rolename, Description);
  });
  //Select permissions for the custom role
  await test.step("Select permissions for the custom role", async () => {
    await rolesAndPermissions.setPermission("user", "update", true);
    await rolesAndPermissions.setPermission("customer", "read", false);
    await rolesAndPermissions.setPermission("custom field", "update", true);
    await rolesAndPermissions.setPermission("role", "delete", true);
    await rolesAndPermissions.setPermission("tag", "update", true);
    await rolesAndPermissions.setPermission("tag", "create", true);
    await rolesAndPermissions.setPermission("note", "create", true);
    await rolesAndPermissions.setPermission("Impersonate user", "update", true);
    await rolesAndPermissions.setPermission("person", "update", true);
    await rolesAndPermissions.setPermission("job view all", "update", false);
    await rolesAndPermissions.setPermission("job status", "update", true);
    await rolesAndPermissions.setPermission("job update all", "update", false);
    await rolesAndPermissions.setPermission("company", "create", true);
  });
  //Click on save button
  await test.step("Click on save button to add the custom role", async () => {
    await rolesAndPermissions.saveChanges();
    await page.waitForSelector(".css-1xsto0d");
  });
  await test.step("search for the created role and verify if it is visible", async () => {
    await rolesAndPermissions.searchForRole(Rolename);
    await rolesAndPermissions.getAllRoles();
    const result = await rolesAndPermissions.isRoleVisible(Rolename);
    expect(result).toBe(true);
  });
});
