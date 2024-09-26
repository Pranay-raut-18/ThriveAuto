import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCRP_11: RolesAndPermissions | Verify Search by role name", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  const customRoleName = "All View";

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
  //Clicks on search bar to search for the role to be edited
  await test.step("Click on Search and search for the role to be edited", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole(customRoleName);
  });
  //Click on menu item for rolename to edit
  await test.step("Click on the action menu for the searched role", async () => {
    const roleRow = page.locator(
      `.MuiDataGrid-row:has-text("${customRoleName}")`
    );
    await roleRow
      .locator('button[aria-label="Open roles action menu"]')
      .click();
  });
  //Expect view button to be not visible
  await test.step("Check Delete button is not visible", async () => {
    const isVisible = await rolesAndPermissions.isViewButtonAbsent();
    expect(isVisible).toBe(true);
  });
});
