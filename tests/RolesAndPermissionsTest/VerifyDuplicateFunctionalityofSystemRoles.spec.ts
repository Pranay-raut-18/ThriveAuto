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
  // Wait for the roles table to be visible
  await page.waitForSelector(".MuiDataGrid-row");

  // Get all the rows
  const rows = await page.$$(".MuiDataGrid-row");

  // Array to store rows with 'System' type
  const systemRows: any[] = [];

  // Loop through the rows and check the Type column
  for (let i = 0; i < rows.length; i++) {
    // Get the text content of the Type column
    const type = await rows[i].$eval(
      '[data-field="roleType"] p',
      (el) => el.textContent
    );

    // If the Type is "System", add the row to the systemRows array
    if (type === "System") {
      systemRows.push(rows[i]);
    }
  }

  // Check if there are any rows with 'System' type
  if (systemRows.length > 0) {
    // Randomly select one row from the systemRows array
    const randomIndex = Math.floor(Math.random() * systemRows.length);
    const selectedRow = systemRows[randomIndex];

    // Click the corresponding option button in the selected row
    const optionButton = await selectedRow.$(
      'button[aria-label="Open roles action menu"]'
    );
    if (optionButton) {
      await optionButton.click();
      console.log(`Clicked option button for a random System role.`);

      // Wait for the dropdown menu to appear and click the "Duplicate" button
      await page.waitForSelector(
        "span.MuiTypography-body1.MuiListItemText-primary.css-1k7spg6"
      );
      const duplicateButton = await page.$(
        "span.MuiTypography-body1.MuiListItemText-primary.css-1k7spg6"
      );
      if (duplicateButton) {
        await duplicateButton.click();
        console.log("Clicked the Duplicate button.");
      }
    }
  } else {
    console.log('No roles with type "System" found.');
  }
});
