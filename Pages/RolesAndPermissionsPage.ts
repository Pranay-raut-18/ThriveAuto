import { Locator, Page } from "@playwright/test";

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
    this.rolesTable = page.locator(".MuiDataGrid-virtualScrollerRenderZone");
  }

  async clickOnRolesAndPermissionsTab() {
    await this.rolesTabButton.click();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async clickOnSearchBar() {
    await this.searchBar.click();
  }

  async getAllRoles(): Promise<string[]> {
    await this.rolesTable.waitFor();
    return this.roleNameCell.allTextContents();
  }

  async searchForRole(roleName: string) {
    await this.searchBar.fill(""); // Clear the search bar
    await this.searchBar.fill(roleName); // Enter the search term
  }

  async isRoleVisible(roleName: string): Promise<boolean> {
    const roleLocator = this.roleNameCell
      .filter({
        hasText: roleName,
      })
      .first();
    return roleLocator.isVisible();
  }
}
