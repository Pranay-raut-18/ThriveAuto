import { Locator, Page, expect } from "@playwright/test";
/**
 * login page
 * @author Abbas
 */

export class RolesAndPermissionsPage {
  readonly page: Page;
  private RolesTabButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.RolesTabButton = page.locator("p", { hasText: "Roles & Permissions" });
  }

  /**
   * Click On Roles and Permissions Tab
   */
  async ClickOnRolesAndPermissionsTab() {
    await this.RolesTabButton.click();
  }
}
