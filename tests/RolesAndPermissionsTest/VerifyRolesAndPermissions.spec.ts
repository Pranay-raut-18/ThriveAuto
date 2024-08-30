import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { RolesAndPermissionsPage } from "../../Pages/RolesAndPermissionsPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("verify login of a user and retrieve all roles from table in roles and permissions tab", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const rolesAndPermissions = new RolesAndPermissionsPage(page);

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Potal
  await test.step(`Go to Admin Potal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  // Verify default display of roles and permissions tab
  await test.step("Verify Roles and Permissions tab", async () => {
    await rolesAndPermissions.clickOnRolesAndPermissionsTab();

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
    const expectedRoles = [
      "Admin",
      "Candidate",
      "Engagement Coordinator",
      "Hiring Manager",
      "Investment Company",
      "New API Role",
      "Partner",
      "Recruiter",
      "Researcher",
      "Super Admin",
    ];
    //console.log("Roles:", roles);
    for (const role of expectedRoles) {
      expect(roles).toContain(role);
    }
  });
  //Verify URL of the roles and permissions tab
  await test.step("Verify URL of the roles and permissions tab", async () => {
    rolesAndPermissions.verifyPageUrl();
  });
  await test.step("Verify search by role in searchbar", async () => {});
});
