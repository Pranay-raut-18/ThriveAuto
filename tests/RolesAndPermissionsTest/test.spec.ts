import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("verify login of a user and retrieve all roles", async ({ page }) => {
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

  // Go to Roles and Permissions tab
  await test.step("Go to Roles and Permissions tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();

    // Wait for the roles table to appear
    await page.waitForLoadState("networkidle");

    let roles = new Set<string>();
    let previousHeight = 0;

    // Scroll and collect roles
    while (true) {
      // Collect role names from the visible rows
      const newRoles = await rolesAndPermissions.getVisibleRoleNames();
      newRoles.forEach((role) => roles.add(role));

      // Scroll down the table to load more roles
      const scrolled = await rolesAndPermissions.scrollRolesTable();
      if (
        !scrolled ||
        previousHeight === (await rolesAndPermissions.getScrollHeight())
      ) {
        break;
      }
      console.log("Roles:", Array.from(roles));
    }
  });
});
