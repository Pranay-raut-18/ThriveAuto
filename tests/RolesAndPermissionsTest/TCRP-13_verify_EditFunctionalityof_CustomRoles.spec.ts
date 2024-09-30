import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils";

test("TCRP_13: RolesAndPermissions | Verify edit functionality of custom roles", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  let timestamp: string;
  timestamp = getCompleteTimestamp();
  const RoleNametoEdit: string = "sdfds";
  const Description: string = `AutoDescription${timestamp}`;

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  // Go to Admin Portal
  await test.step("Go to Admin Portal Customer tab", async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Clicks on Roles and Permissions Tab
  await test.step("Click on Roles and Permissions Tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
  });

  //Clicks on search bar to search for the role to be edited
  await test.step("Click on Search and search for the role to be edited", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole(RoleNametoEdit);
  });

  //Click on menu item for rolename to edit
  await test.step("Click on the action menu for the searched role", async () => {
    const roleRow = page.locator(
      `.MuiDataGrid-row:has-text("${RoleNametoEdit}")`
    );
    await roleRow
      .locator('button[aria-label="Open roles action menu"]')
      .click();
  });

  // Click on "Edit" menu item
  await test.step("Click on 'Edit' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem("Edit Details");
  });

  // Fill name and description
  await test.step("Fill name and description", async () => {
    await page.waitForLoadState("networkidle");
    await rolesAndPermissions.fillRoleAndDescription(
      RoleNametoEdit,
      Description
    );
    // Dynamically select/unselect permissions
    await rolesAndPermissions.setPermission("user", "delete", false);
    await rolesAndPermissions.setPermission("user", "update", false);
    await rolesAndPermissions.setPermission("user", "create", false);
    await rolesAndPermissions.setPermission(
      "impersonate user",
      "update",
      false
    );
    await rolesAndPermissions.setPermission("role", "delete", false);
    await rolesAndPermissions.setPermission("note", "delete", true);
    await rolesAndPermissions.setPermission(
      "scorecard template",
      "delete",
      true
    );
    await rolesAndPermissions.saveChanges();
    await page.waitForSelector(".css-1xsto0d");
  });
  await test.step("Verify if edited successfully messsage", async () => {
    const result = await rolesAndPermissions.CheckifSucessMessageisVisible();
    expect(result).toBe(true);
  });
});
