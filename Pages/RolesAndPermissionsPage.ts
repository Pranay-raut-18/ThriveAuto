import { Locator, Page } from "@playwright/test";

export class RolesAndPermissionsPage {
  readonly page: Page;
  private rolesTabButton: Locator;
  private rolesTableRow: Locator;
  private searchBar: Locator;
  private roleNameCell: Locator;
  private rolesTable: Locator;
  private noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rolesTabButton = page.locator("p", { hasText: "Roles & Permissions" });
    this.rolesTableRow = page.locator(".MuiDataGrid-row");
    this.searchBar = page.locator(
      'input[placeholder="Search by name or description"]'
    );
    this.roleNameCell = page.locator('.MuiDataGrid-cell[data-field="name"]');
    this.rolesTable = page.locator(".MuiDataGrid-virtualScrollerRenderZone");
    this.noResultsMessage = page.locator(
      "p.MuiTypography-root.MuiTypography-body2.css-1a75746"
    );
  }

  async clickOnRolesAndPermissionsTab() {
    await this.rolesTabButton.click();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async clickOnSearchBar() {
    try {
      // Wait for the search bar to be visible and enabled
      await this.searchBar.waitFor({ state: "visible", timeout: 3000 });
      await this.searchBar.waitFor({ state: "attached", timeout: 3000 });
      await this.searchBar.click();
    } catch (error) {
      console.error("Failed to click on the search bar:", error);
      throw error;
    }
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
  async isNoResultsMessageVisible(): Promise<boolean> {
    return await this.noResultsMessage.isVisible();
  }
  async getNoResultsMessageText(): Promise<string> {
    const message = (await this.noResultsMessage.textContent()) || "";
    //console.log(message);
    return message;
  }
}
