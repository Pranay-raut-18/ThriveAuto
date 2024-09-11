import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCRP_15: RolesAndPermissions | Verify delete functionality of custom roles", async ({
  page,
}) => {
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

  // Step 4: Scroll down and click on the action menu for a specific role
  await test.step("Scroll down and click on the action menu for 'custom' role", async () => {
    const agentRoleRow = await rolesAndPermissions.getRoleRow("Asha");
    await agentRoleRow.scrollIntoViewIfNeeded();
    await rolesAndPermissions.clickOnRoleActionMenu("Asha");
    await page.pause();
  });

  // Step 5: Click on the 'Duplicate' option from the action menu
  await test.step("Click on 'Duplicate' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem("Delete");
  });
});
