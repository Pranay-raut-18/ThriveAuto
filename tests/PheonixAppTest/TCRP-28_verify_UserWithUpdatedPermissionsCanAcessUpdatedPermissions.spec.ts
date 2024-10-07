import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import {
  Url,
  EmailAddress1,
  Password1,
  EmailAddress,
  Password,
} from "../../utils/config-utils";
import { PheonixAppPage } from "../../Pages/PheonixAppPage";
import { getCompleteTimestamp } from "../../utils/common-utils";
import { HomePage } from "../../Pages/HomePage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";

test("To Verify that the System role with updated view functionality is able to view people in the Pheonix Appplication", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const pheonixAppPage = new PheonixAppPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);
  const tabtoclick: string = "People";
  const persontosearch: string = "佐藤昌宏";
  let timestamp: string;
  timestamp = getCompleteTimestamp();
  const RoleNametoEdit: string = "Only Tag View Role";
  const Description: string = `AutoDescription${timestamp}`;

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  // Go to Admin Portal
  await test.step("Go to Admin Portal Customer tab", async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Clicks on Roles and Permissions Tab
  await test.step("Click on Roles and Permissions Tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();
  });

  //Clicks on search bar to search for the role to be edited
  await test.step("Click on Search and search for the role to be edited", async () => {
    await rolesAndPermissions.clickOnSearchBar();
    await rolesAndPermissions.searchForRole(RoleNametoEdit);
  });
  //Click on menu item for rolename to edit
  await test.step("Click on the action menu for the searched role", async () => {
    await rolesAndPermissions.waitForRoleToAppear(RoleNametoEdit);
    await rolesAndPermissions.clickOptionsMenuofSearchedRole(RoleNametoEdit);
  });

  // Click on "Edit" menu item
  await test.step("Click on 'Edit' menu item", async () => {
    await rolesAndPermissions.clickOnMenuItem("Edit Details");
  });

  // Fill name and description
  await test.step("Fill name,description and permissions", async () => {
    await page.waitForLoadState("networkidle");
    await rolesAndPermissions.fillRoleAndDescription(
      RoleNametoEdit,
      Description
    );
    await rolesAndPermissions.setPermission("user", "update", true);
    await rolesAndPermissions.setPermission("person", "delete", true);
    await rolesAndPermissions.saveChanges();
    await page.waitForLoadState("networkidle");
    await page.getByLabel("Open Account Menu").click();
    await page.getByRole("menuitem", { name: "Log Out" }).click();
    await page.waitForURL("https://thrive.thrive-qa.com/login");
  });

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await page.waitForLoadState("networkidle");
    await loginPage.login(Url, EmailAddress1, Password1);
  });
  //Clicks on People tab in pheonix application
  await test.step("Click on people tab", async () => {
    await pheonixAppPage.clickTabByName(tabtoclick);
  });
  //Clicks on search bar and fills the name
  await test.step("Click on Search button to search for name of person to view", async () => {
    await pheonixAppPage.clickOnSearchBar();
    await pheonixAppPage.enterTextToSearch(persontosearch);
    await pheonixAppPage.clickSearchResultByName(persontosearch);
    await page.waitForLoadState("networkidle");
  });
  //Checks weather user is able to view people
  await test.step("check weather user is able to view name", async () => {
    const result = await pheonixAppPage.checkifNameinViewisVisible();
    expect(result).toBe(true);
  });
});
