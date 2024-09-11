import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCRP_06: RolesAndPermissions | Verify Search by description", async ({
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

  // Verify search by description in search bar
  await test.step("Verify search by description in search bar", async () => {
    const descriptionToSearch = "Specific description text"; // Replace with the actual description text you want to search
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForDescription(descriptionToSearch);

    // Wait for the search results to update and check visibility
    const isVisible = await rolesAndPermissions.isDescriptionVisible(
      descriptionToSearch
    );
    expect(isVisible).toBe(true);
  });
});
