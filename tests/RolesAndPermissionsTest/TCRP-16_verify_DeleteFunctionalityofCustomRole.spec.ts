import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test.skip("TCRP_16: RolesAndPermissions | Verify delete functionality of custom roles", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  const roletodelete: string = "AutoRolename";
  const menuItemName = "Delete";

  // Step 1: Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  // Step 2: Go to Admin Portal
  await test.step("Go to Admin Portal Customer tab", async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Step 3: Click on Roles and Permissions Tab
  await test.step("Click on Roles and Permissions Tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
  });
  //Step 4: Click on the search bar in roles and permissions tab
  await test.step("Click on search bar ", async () => {
    await rolesAndPermissions.clickOnSearchBar();
  });
  await test.step("Fill custom role name with role we want to delete", async () => {
    await rolesAndPermissions.searchForRole(roletodelete);
    await page.waitForLoadState("networkidle");
  });
  // Wait for the role row to be present and visible
  await test.step(`Wait for the role row: ${roletodelete}`, async () => {
    await rolesAndPermissions.waitForRoleToAppear(roletodelete);
  });

  // Locate the row with the desired role name and click the action menu button
  await test.step("Click on the action menu for the searched role", async () => {
    await rolesAndPermissions.clickOptionsMenuofSearchedRole(roletodelete);
  });
  await test.step("Click on 'Delete' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem(menuItemName);
    await rolesAndPermissions.clickDeleteButton();
    await page.waitForLoadState("networkidle");
  });
  await test.step("Searching the deleted role", async () => {
    await rolesAndPermissions.searchForRole(roletodelete);
    await page.waitForLoadState("networkidle");
    const result = await rolesAndPermissions.isRoleVisible(roletodelete);
    expect(result).toBe(false);
  });
});
