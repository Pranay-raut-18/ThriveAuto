import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("verify login of a user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);

  // Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  // Verify user is logged in successfully
  await test.step(`Verify user is logged in successfully`, async () => {
    homePage.clickOnOpenAccountMenu();
    await expect(await page.getByText("Log Out")).toHaveText("Log Out");
    await page.locator("#account-menu > .MuiBackdrop-root").click();
  });

  // Go to Admin Portal
  await test.step(`Go to Admin Portal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Go to Roles and Permissions tab
  await test.step("Verify title of Roles and Permissions Tab ", async () => {
    await rolesAndPermissions.ClickOnRolesAndPermissionsTab();
    const url = await page.url();
    const lastSegment = url.split("/").pop();
    expect(lastSegment).toBe("roles-and-permissions");
  });
  await test.step("Got to Roles ", async () => {});
});
