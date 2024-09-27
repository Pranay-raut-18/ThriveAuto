import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCRP_31: RolesAndPermissions | Verify Error text in create custom roles (name,description not filled)", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  let expErrMsg: (string | null)[] = [
    "Please enter a role name",
    "Please enter a brief description",
  ];
  let actErrMsg: (string | null)[];

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
  //Click on "+Role" button
  await test.step("Click on add custom roles button", async () => {
    await rolesAndPermissions.AddNewRoleBtnClick();
  });
  //Click on roles and permissions and leave the fields empty
  await test.step("Click on name and description field and keep them empty", async () => {
    await rolesAndPermissions.fillRoleAndDescription("", "");
    await rolesAndPermissions.fillRoleAndDescription("", "");
  });
  //Get name and description error text
  await test.step("Get name and description error text", async () => {
    actErrMsg = await rolesAndPermissions.getAllErrorTexts();
  });
  //Verify error texts
  await test.step("Verify error texts ", async () => {
    const expErrMsgString = JSON.stringify(expErrMsg);
    const actErrMsgString = JSON.stringify(actErrMsg);
    expect.soft(actErrMsgString).toBe(expErrMsgString);
    // console.log(actErrMsgString);
    // console.log(expErrMsgString);
  });
});
