import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("Verify partial search roles and permissions tab", async ({ page }) => {
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

  // Click on Roles and Permissions Tab
  await test.step("Click on Roles and Permissions Tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
  });

  // Verify search by role in search bar
  await test.step("Verify search by role in search bar", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole("admin");

    // Add a short wait to ensure the search results are updated
    await page.waitForTimeout(2000); // Adjust the timeout as needed

    // Fetch all roles after searching
    const rolesAfterSearch = await rolesAndPermissions.getAllRoles();
    console.log("Roles after search:", rolesAfterSearch);

    // Check if "admin" is among the visible roles
    const isVisible = await rolesAndPermissions.isRoleVisible("admin");
    expect(isVisible).toBe(true);
  });
});
