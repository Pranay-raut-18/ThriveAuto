import { Locator, Page } from "@playwright/test";

export class RolesAndPermissionsPage {
  readonly page: Page;
  private rolesTabButton: Locator;
  private rolesTableRow: Locator;
  private searchBar: Locator;
  private roleNameCell: Locator;
  private roleDescriptionCell: Locator;
  private rolesTable: Locator;
  private noResultsMessage: Locator;
  private roleTypeCell: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roleTypeCell = page.locator(
      '.MuiDataGrid-cell[data-field="roleType"]'
    );
    this.rolesTabButton = page.locator("p", { hasText: "Roles & Permissions" });
    this.rolesTableRow = page.locator(".MuiDataGrid-row");
    this.searchBar = page.locator(
      'input[placeholder="Search by name or description"]'
    );
    this.roleNameCell = page.locator('.MuiDataGrid-cell[data-field="name"]');
    this.roleDescriptionCell = page.locator(
      '.MuiDataGrid-cell[data-field="description"]'
    );
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
      await this.searchBar.waitFor({ state: "visible", timeout: 3000 });
      await this.searchBar.waitFor({ state: "attached", timeout: 3000 });
      await this.searchBar.click();
    } catch (error) {
      console.error("Failed to click on the search bar:", error);
      throw error;
    }
  }

  async searchForRole(roleName: string) {
    await this.searchBar.fill("");
    await this.searchBar.fill(roleName);
  }

  async searchForDescription(description: string) {
    await this.searchBar.fill("");
    await this.searchBar.fill(description);
  }

  async getAllRoles(): Promise<string[]> {
    await this.rolesTable.waitFor();
    return this.roleNameCell.allTextContents();
  }

  async isRoleVisible(roleName: string): Promise<boolean> {
    const roleLocator = this.roleNameCell
      .filter({
        hasText: roleName,
      })
      .first();
    return roleLocator.isVisible();
  }

  async isDescriptionVisible(description: string): Promise<boolean> {
    const descriptionLocator = this.roleDescriptionCell
      .filter({
        hasText: description,
      })
      .first();
    return descriptionLocator.isVisible();
  }

  getNoResultsMessageLocator(): Locator {
    return this.noResultsMessage;
  }

  async isNoResultsMessageVisible(): Promise<boolean> {
    return this.noResultsMessage.isVisible();
  }

  async getNoResultsMessageText(): Promise<string> {
    return (await this.noResultsMessage.textContent()) || "";
  }
  async clickOnRoleActionMenu(roleName: string) {
    await this.page
      .getByRole("row", {
        name: `${roleName} System Open roles action menu`,
        exact: true,
      })
      .getByLabel("Open roles action menu")
      .click();
  }

  async clickOnMenuItem(menuItemName: string) {
    await this.page.getByRole("menuitem", { name: menuItemName }).click();
  }

  async closeButtonofDuplicateTab() {
    const closeButton = this.page.getByLabel("Close Drawer");
    return closeButton.isVisible();
  }
}
