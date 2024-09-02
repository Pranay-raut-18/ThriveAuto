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

  // Verify search by invalid role in search bar
  await test.step("Verify search by invalid role in search bar", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole("Invalid_name");

    // Wait for the "No results" message to be visible
    await rolesAndPermissions.isNoResultsMessageVisible();

    // Verify the text of the "No results" message
    const messageText = await rolesAndPermissions.getNoResultsMessageText();
    expect(messageText).toBe("No results");

    // Optionally log the result for debugging
    console.log("No results message is displayed as expected.");
  });
});
