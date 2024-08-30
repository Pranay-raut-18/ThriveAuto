import { Locator, Page, expect } from "@playwright/test";

/**
 * Roles and Permissions Page
 */
export class RolesAndPermissionsPage {
  readonly page: Page;
  private RolesTabButton: Locator;
  private RolesTableRow: Locator;
  private SearchBar: Locator;
  private RoleLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.RolesTabButton = page.locator("p", { hasText: "Roles & Permissions" });
    this.RolesTableRow = page.locator(".MuiDataGrid-row");
    this.SearchBar = page.locator(
      'input[placeholder="Search by name or description"]'
    );
    this.RoleLocator = this.page.locator(
      '.MuiDataGrid-cell[data-field="name"]'
    );
  }

  /**
   * Click on Roles and Permissions Tab
   */
  async clickOnRolesAndPermissionsTab() {
    await this.RolesTabButton.click();
  }

  /**
   * Verify the URL of the page
   */
  async verifyPageUrl() {
    const url = await this.page.url();
    const expURL = "roles-and-permissions";
    const acturl = url.split("/").pop();
    await expect(acturl).toEqual(expURL);
  }

  /**
   * Click on the search bar
   */
  async clickOnSearchBar() {
    await this.SearchBar.click();
  }

  /**
   * Retrieve all roles from the table
   */
  async getAllRoles(): Promise<string[]> {
    await this.page.waitForSelector(".MuiDataGrid-virtualScrollerRenderZone");
    return this.page.evaluate(() => {
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
  }

  /**
   * Verify if a specific role is displayed in the table
   */
  async isRoleDisplayed(roleName: string) {
    const roleLocator = this.RoleLocator.filter({
      hasText: roleName,
    }).first();
    await expect(roleLocator).toBeVisible();
  }
}
