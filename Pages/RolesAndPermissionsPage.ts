import { Locator, Page, expect } from "@playwright/test";
/**
 * login page
 * @author Abbas
 */

export class RolesAndPermissionsPage {
  readonly page: Page;
  private RolesTabButton: Locator;
  private RolesTableRow: Locator;
  private SearchBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.RolesTabButton = page.locator("p", { hasText: "Roles & Permissions" });
    this.RolesTableRow = page.locator(".MuiDataGrid-row");
    this.SearchBar = page.locator(
      "/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]"
    );
  }

  /**
   * Click On Roles and Permissions Tab
   */
  async clickOnRolesAndPermissionsTab() {
    await this.RolesTabButton.click();
  }
  async verifyPageUrl() {
    const url = await this.page.url();
    const expURL = "roles-and-permissions";
    const acturl = url.split("/").pop();
    await expect(await acturl).toEqual(expURL);
  }
  async clickOnSearchBar() {
    await this.SearchBar.click();
  }
}
