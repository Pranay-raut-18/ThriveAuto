import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("Verify url of the roles and permissions tab", async ({ page }) => {
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
  // Verify URL of the roles and permissions tab
  await test.step("Verify URL of the roles and permissions tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
    const currentUrl = await rolesAndPermissions.getPageUrl();
    const expectedUrlSegment = "roles-and-permissions";
    const actualUrlSegment = currentUrl.split("/").pop();
    expect(actualUrlSegment).toEqual(expectedUrlSegment);
  });
});
