import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils";

test("TCRP_18: RolesAndPermissions | No Duplicate roles can be created with similar role name", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  const Rolename: string = "Admin";
  const Description: string = "AutoDescription";

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
  //Click on Add "+Roles" custom roles
  await test.step("Click on add custom roles button", async () => {
    await rolesAndPermissions.AddNewRoleBtnClick();
  });
  //Fill auto name and auto description
  await test.step("Fills auto name and auto description", async () => {
    await page.waitForLoadState("networkidle");
    await rolesAndPermissions.fillRoleAndDescription(Rolename, Description);
  });
  //Select update permission to manage customer
  await test.step("Select permission to manage Customer", async () => {
    await rolesAndPermissions.setPermission("user", "delete", true);
  });
  //Click on save button
  await test.step("Click on save button to add the custom role", async () => {
    await rolesAndPermissions.saveChangesWithoutCheck();
    const result = await rolesAndPermissions.getErrTxtWhenDuplicateRoleName();
    expect(result).toBe("must be unique");
  });
});
