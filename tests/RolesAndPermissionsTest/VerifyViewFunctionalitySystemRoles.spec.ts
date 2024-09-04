import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("Verify invalid search in roles and permissions tab", async ({ page }) => {
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
  await test.step("Click on action menu for 'Admin' role", async () => {
    await rolesAndPermissions.clickOnRoleActionMenu("Admin");
  });

  // Step 5: Click on "View" menu item
  await test.step("Click on 'View' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem("View");
    await page.pause();
  });

  // Step 6: Verify that the drawer is visible and close it
  await test.step("Verify and close the drawer", async () => {
    expect(rolesAndPermissions.closeButtonofDuplicateTab()).toBeTruthy();
  });
});
