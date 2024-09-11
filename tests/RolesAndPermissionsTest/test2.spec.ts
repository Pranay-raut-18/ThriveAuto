import { test, expect } from "@playwright/test";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { LoginPage } from "../../Pages/LoginPage";
import { EmailAddress, Password, Url } from "../../utils/config-utils";

test("Get roles and types in virtual scroller", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);

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

  // Step 4: Extract role name and type from virtual scroller and perform actions
  await test.step("Extract roles and types from the virtual scroller", async () => {
    // Define locators for rows and columns within the scroller
    const rowLocator = page.locator(".MuiDataGrid-row"); // Locator for rows
    const roleNameLocator = '[data-field="name"]'; // Locator for role name column
    const roleTypeLocator = '[data-field="roleType"]'; // Locator for role type column

    // Get the count of visible rows
    const rowCount = await rowLocator.count();

    // Iterate through each visible row to extract role name and role type
    for (let i = 0; i < rowCount; i++) {
      // Scroll row into view to handle virtual scrolling
      await rowLocator.nth(i).scrollIntoViewIfNeeded();

      // Extract role name from the row
      const roleName = await rowLocator
        .nth(i)
        .locator(roleNameLocator)
        .innerText();

      // Extract role type from the row
      const roleType = await rowLocator
        .nth(i)
        .locator(roleTypeLocator)
        .innerText();

      // Log the extracted role name and role type for verification
      console.log(`Role Name: ${roleName}, Role Type: ${roleType}`);

      // Perform further actions based on role name
      if (roleName === "Asha") {
        // Click the action button for the corresponding role
        await rowLocator
          .nth(i)
          .locator('button[aria-label="Open roles action menu"]')
          .click();

        console.log(`Action menu clicked for role: ${roleName}`);
      }
    }
  });
});
