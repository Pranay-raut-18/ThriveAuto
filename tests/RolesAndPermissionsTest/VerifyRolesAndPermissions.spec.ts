import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("verify login of a user and retrieve all roles from table", async ({
  page,
}) => {
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
  await test.step("Go to Roles and Permissions tab", async () => {
    await rolesAndPermissions.ClickOnRolesAndPermissionsTab();

    const url = await page.url();
    console.log(`Page URL: ${url}`);

    const lastSegment = url.split("/").pop();
    expect(lastSegment).toBe("roles-and-permissions");

    //
    await page.waitForSelector(".MuiDataGrid-virtualScrollerRenderZone");

    const roles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".MuiDataGrid-row")).map(
        (row) => {
          const roleName =
            row
              .querySelector(
                '.MuiDataGrid-cell[data-field="name"] .MuiDataGrid-cellContent'
              )
              ?.textContent?.trim() || "";
          return roleName;
        }
      );
    });

    console.log("Roles:", roles);
  });
});
