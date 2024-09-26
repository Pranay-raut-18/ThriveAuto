import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCRP_00: RolesAndPermissions | Verify_Url of page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  const expectedUrlSegment = "roles-and-permissions";

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
    await page.waitForURL(currentUrl);
    const actualUrlSegment = currentUrl.split("/").pop();
    expect(actualUrlSegment).toEqual(expectedUrlSegment);
  });
});
