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

  // Verify roles in Roles and Permissions tab
  await test.step("Verify roles in Roles and Permissions tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
    const roles = await rolesAndPermissions.getAllRoles();
    expect(roles).toBeTruthy();
  });

  // Verify URL of the roles and permissions tab
  await test.step("Verify URL of the roles and permissions tab", async () => {
    const currentUrl = await rolesAndPermissions.getPageUrl();
    const expectedUrlSegment = "roles-and-permissions";
    const actualUrlSegment = currentUrl.split("/").pop();
    expect(actualUrlSegment).toEqual(expectedUrlSegment);
  });

  // Verify search by role in search bar
  await test.step("Verify search by role in search bar", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole("admin");
    const isVisible = await rolesAndPermissions.isRoleVisible("admin");
    expect(isVisible).toBe(true);
  });

  // Verify search by partial role in search bar
  await test.step("Verify search by partial role in search bar", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole("Admi");

    // Fetch all roles after searching for the partial term "Admi"
    const rolesAfterSearch = await rolesAndPermissions.getAllRoles();

    // Check that at least one role contains "Admi"
    const hasPartialMatch = rolesAfterSearch.some((role) =>
      role.toLowerCase().includes("admi")
    );
    // Ensure that there is at least one role that matches the partial search term
    expect(hasPartialMatch).toBe(true);
  });
});
