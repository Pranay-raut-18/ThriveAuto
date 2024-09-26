import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCRP_11: RolesAndPermissions | Verify Search by role name", async ({
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
  //Click on the action menu according to choice
  await test.step("Click on action menu for 'Admin' role", async () => {
    await rolesAndPermissions.clickOnRoleActionMenu("Candidate");
  });
  //Expect delete button to be not visible
  await test.step("Check Delete button is not visible", async () => {
    const isVisible = await rolesAndPermissions.isDeleteButtonAbsent();
    expect(isVisible).toBe(true);
  });
});
