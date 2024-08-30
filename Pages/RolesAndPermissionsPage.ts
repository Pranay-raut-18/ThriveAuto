import { Locator, Page, expect } from "@playwright/test";

/**
 * Roles and Permissions Page
 */
export class RolesAndPermissionsPage {
  readonly page: Page;
  private rolesTabButton: Locator;
  private rolesTableRow: Locator;
  private searchBar: Locator;
  private roleNameCell: Locator;
  private rolesTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rolesTabButton = page.locator("p", { hasText: "Roles & Permissions" });
    this.rolesTableRow = page.locator(".MuiDataGrid-row");
    this.searchBar = page.locator(
      'input[placeholder="Search by name or description"]'
    );
    this.roleNameCell = page.locator('.MuiDataGrid-cell[data-field="name"]');
    this.rolesTable = page.locator(".MuiDataGrid-virtualScrollerRenderZone"); // New locator for the roles table
  }

  /**
   * Click on Roles and Permissions Tab
   */
  async clickOnRolesAndPermissionsTab() {
    await this.rolesTabButton.click();
  }

  /**
   * Verify the URL of the page
   */
  async verifyPageUrl() {
    const url = await this.page.url();
    const expectedUrlSegment = "roles-and-permissions";
    const actualUrlSegment = url.split("/").pop();
    await expect(actualUrlSegment).toEqual(expectedUrlSegment);
  }

  /**
   * Click on the search bar
   */
  async clickOnSearchBar() {
    await this.searchBar.click();
  }

  /**
   * Retrieve all roles from the table
   */
  async getAllRoles(): Promise<string[]> {
    await this.rolesTable.waitFor(); // Wait for the roles table to be visible
    return this.roleNameCell.allTextContents();
  }

  /**
   * Verify if a specific role is displayed in the table
   */
  async isRoleDisplayed(roleName: string) {
    const roleLocator = this.roleNameCell
      .filter({
        hasText: roleName,
      })
      .first();
    await expect(roleLocator).toBeVisible();
  }
}
