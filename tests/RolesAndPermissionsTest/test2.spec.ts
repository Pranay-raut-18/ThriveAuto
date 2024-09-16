import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("Interact with roles action menu based on role name with multiple scrolls", async ({
  page,
}) => {
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

  // Wait for the table to load
  await page.waitForSelector(".MuiDataGrid-virtualScrollerRenderZone");

  // Define locators for rows and columns within the scroller
  const rowLocator = page.locator(".MuiDataGrid-row");
  const roleNameLocator = '[data-field="name"]';
  const scroller = page.locator(".MuiDataGrid-virtualScrollerRenderZone"); // Virtual scroller element

  let targetRoleFound = false;
  let previousRowCount = 0;
  let scrollAttempts = 0;

  // Loop to handle scrolling and checking rows
  while (!targetRoleFound && scrollAttempts < 20) {
    // Limit scrolling attempts to prevent infinite loops
    const rowCount = await rowLocator.count();

    // Iterate through each visible row and extract role name
    for (let i = 0; i < rowCount; i++) {
      const roleName = await rowLocator
        .nth(i)
        .locator(roleNameLocator)
        .innerText();
      console.log(`Role Name: ${roleName}`);

      if (roleName === "zlastrole") {
        // Click the action button for the desired role
        await rowLocator
          .nth(i)
          .locator('button[aria-label="Open roles action menu"]')
          .click();
        console.log(`Clicked on action menu for role: ${roleName}`);
        targetRoleFound = true;
        break;
      }
    }

    // Scroll down if target role is not found
    if (!targetRoleFound && rowCount > previousRowCount) {
      // Scroll the virtual scroller div by simulating a scroll event
      await scroller.evaluate((el) => {
        el.scrollBy(0, el.clientHeight); // Scroll down by the height of the scroller
      });

      previousRowCount = rowCount;
      scrollAttempts++;
      await page.waitForTimeout(500); // Add a short delay for rows to load
    } else {
      // Exit if no new rows are loaded (end of table)
      break;
    }
  }

  if (!targetRoleFound) {
    console.log("Role not found after scrolling.");
  }
  await page.pause();
});
