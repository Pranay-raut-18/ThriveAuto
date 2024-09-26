import { Locator, Page } from "@playwright/test";

/**
 *  RolesAndPermissionsPage page
 * @author Vallail N
 */

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
  private roleNameInput: Locator;
  private roleDescriptionInput: Locator;
  private saveButtonInOptionsTab: Locator;
  private AddCustomRolesButton: Locator;
  private deletebuttonforcustomrole: Locator;
  private errortxtName: Locator;
  private errortxtDescription: Locator;
  private saveButtonLocator: Locator;
  private maxErrorTypeLast: Locator;
  private alertMessage: Locator;
  private errorMessageWhenSelectingCustomers: Locator;
  private roleShouldbeUniqueErrTxt: Locator;
  private menuItems: Locator;

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
    // Locator for the Role input field
    this.roleNameInput = page.locator('input[name="name"]');
    // Locator for the Description textarea field
    this.roleDescriptionInput = page.locator('textarea[name="description"]');
    this.saveButtonInOptionsTab = page.getByRole("button", { name: "Save" });
    this.AddCustomRolesButton = page.getByRole("button", {
      name: "Role",
      exact: true,
    });
    this.deletebuttonforcustomrole = page.locator('button:has-text("Delete")');
    this.errortxtName = page.locator('p[id=":r14:-helper-text"]');
    this.errortxtDescription = page.locator('p[id=":r15:-helper-text"]');
    this.saveButtonLocator = page.locator(
      'button[type="submit"][class*="MuiButton-root"]'
    );
    this.maxErrorTypeLast = page.locator(
      "span.MuiTypography-root.MuiTypography-caption.css-iaqowd"
    );
    this.alertMessage = page.locator("div.MuiAlert-message.css-1xsto0d");
    this.errorMessageWhenSelectingCustomers = page.locator(
      "span.MuiTypography-root.MuiTypography-caption.css-iaqowd"
    );
    this.roleShouldbeUniqueErrTxt = page.locator(".css-nce39c");
    this.menuItems = page.locator('ul[role="menu"] li');
  }

  /**
   * Clicks on the roles and permissions tab (only works in admin portal)
   */
  async clickOnRolesAndPermissionsTab() {
    await this.rolesTabButton.click();
  }

  /**
   * Gets the url of the page
   * @returns page url
   */
  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Clicks on the roles and permissions tab in admin
   */
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

  /**
   *  @param roleName : It is the role you want to search using search functionality
   *  Fills the Search bar with the role name passed.
   */
  async searchForRole(roleName: string) {
    await this.searchBar.fill("");
    await this.searchBar.fill(roleName);
    await this.rolesTable.waitFor();
  }

  /**
   * @param description : It is the description you want to search using search functionality
   * Searches for the description of the role
   */
  async searchForDescription(description: string) {
    await this.searchBar.fill("");
    await this.searchBar.fill(description);
  }
  /**
   * Gets the role displayed in the virtual scroller grid
   */
  async getAllRoles(): Promise<string[]> {
    await this.rolesTable.waitFor();
    return this.roleNameCell.allTextContents();
  }

  /**
   * @param roleName : The role to be verified in the virtual scroller grid
   * Checks the role is visible in the virtual scroller grid
   * @returns true/false role name is visible
   */
  async isRoleVisible(roleName: string): Promise<boolean> {
    const roleLocator = this.roleNameCell
      .filter({
        hasText: roleName,
      })
      .first();
    return roleLocator.isVisible();
  }

  /**
   * @param description : The description of the role to be verified in the virtual scroller grid
   * Checks the role is visible in the virtual scroller grid
   * @returns true/false for the description visible
   */

  async isDescriptionVisible(description: string): Promise<boolean> {
    const descriptionLocator = this.roleDescriptionCell
      .filter({
        hasText: description,
      })
      .first();
    return descriptionLocator.isVisible();
  }
  /**
   * Gets the no result mesage when virtual scroller grid displays no results
   * @returns no results mesaage
   */

  getNoResultsMessageLocator(): Locator {
    return this.noResultsMessage;
  }
  /**
   * Gets the no result mesage when virtual scroller grid displays no results
   * @returns true/false if no results message si visible or not
   */
  async isNoResultsMessageVisible(): Promise<boolean> {
    return this.noResultsMessage.isVisible();
  }
  /**
   * Gets the no result mesage when virtual scroller grid displays no results
   * @returns true/false if no results message text
   */

  async getNoResultsMessageText(): Promise<string> {
    return (await this.noResultsMessage.textContent()) || "";
  }
  /**
   * Clicks on the option of the rolename
   * Clicks on the rolename passed as an argument
   */
  async clickOnRoleActionMenu(roleName: string) {
    await this.page
      .getByRole("row", {
        name: `${roleName} System Open roles action menu`,
        exact: true,
      })
      .getByLabel("Open roles action menu")
      .click();
  }
  /**
   * Clicks on menu item in options of roles for eg:-(view, duplicate , delete ,edit)
   */
  async clickOnMenuItem(menuItemName: string) {
    await this.page.getByRole("menuitem", { name: menuItemName }).click();
  }
  /**
   * Function to verify drawer is open or not
   * @returns true/false if the option tab is visible or not
   */
  async closeButtonofDuplicateTab() {
    const closeButton = this.page.getByLabel("Close Drawer");
    return closeButton.isVisible();
  }

  /**
   * Fills the role name and description
   */
  async fillRoleAndDescription(role: string, description: string) {
    await this.roleNameInput.fill(role);
    await this.roleDescriptionInput.fill(description);
  }

  /**
   *
   * @param roleName
   * @returns role row of the virtual scroller table
   */
  async getRoleRow(roleName: string): Promise<Locator> {
    return this.page.getByRole("row", { name: roleName });
  }
  /**
   *
   * @returns returns text
   */
  async getVisibleRoleNames(): Promise<string[]> {
    return this.page.$$eval(
      '.MuiDataGrid-cell[data-field="name"] .MuiDataGrid-cellContent',
      (cells) => cells.map((cell) => cell.textContent?.trim() || "")
    );
  }
  async getVisibleAllRowData(): Promise<string[]> {
    return this.page.$$eval(".MuiDataGrid-row", (cells) =>
      cells.map((cell) => cell.textContent?.trim() || "")
    );
  }
  async getVisibleDescription(): Promise<string[]> {
    return this.page.$$eval(
      '.MuiDataGrid-cell[data-field="description"] .MuiDataGrid-cellContent',
      (cells) => cells.map((cell) => cell.textContent?.trim() || "")
    );
  }

  async scrollRolesTable(): Promise<boolean> {
    const scrollBefore = await this.getScrollHeight();
    await this.page.evaluate(() => {
      const table = document.querySelector(".MuiDataGrid-virtualScroller");
      if (table) {
        table.scrollBy(0, table.scrollHeight);
      }
    });
    await this.page.waitForLoadState("domcontentloaded");
    const scrollAfter = await this.getScrollHeight();
    return scrollBefore !== scrollAfter;
  }

  async getScrollHeight(): Promise<number> {
    return await this.page.evaluate(
      'document.querySelector(".MuiDataGrid-virtualScroller").scrollTop'
    );
  }
  /**
   * Function to select permissions dynamically
   * @param roleName is the name of permission to change (for eg:- manage user , impersonate user etc)
   * @param permissionType is the type of permission to change (for eg:- edit , update , delete , view etc)
   * @param check to select or deselect as per requirement (for eg:- manage user , delete , true ) true for check false for uncheck
   */
  async setPermission(
    roleName: string,
    permissionType: "create" | "edit" | "delete" | "view" | "update" | "read",
    check: boolean
  ) {
    // Adjust the roleName to match the actual format used in the HTML (lowercase and underscores)
    const formattedRoleName = roleName.toLowerCase().replace(/ /g, "_");

    // Construct the dynamic locator
    const permissionLocator = `input[name="privileges\\.${formattedRoleName}-${permissionType}"]`;
    // Check or uncheck based on the boolean flag
    if (check) {
      await this.page.locator(permissionLocator).check();
    } else {
      await this.page.locator(permissionLocator).uncheck();
    }
  }
  async CheckifSucessMessageisVisible() {
    return this.alertMessage.isVisible();
  }
  /**
   * Clicks on save button in edit permissions tab
   */
  async saveChanges() {
    await this.saveButtonLocator.isEnabled();
    await this.saveButtonLocator.click();
    await this.CheckifSucessMessageisVisible();
  }
  /**
   * Clicks on add custom roles button in roles and permissions tab
   */
  async AddNewRoleBtnClick() {
    await this.AddCustomRolesButton.click();
  }
  /**
   *Clicks on delete button in roles and permissions popup tab
   */
  async clickDeleteButton() {
    // Define the locator for the delete button
    const deleteButtonLocator = this.deletebuttonforcustomrole;
    // Wait for the delete button to be visible
    await deleteButtonLocator.waitFor({ state: "visible", timeout: 2000 });
    // Click on the delete button
    await deleteButtonLocator.click();
  }
  /**
   * Gets error texts for both name and description
   * @returns error text of name and description
   */
  async getAllErrorTexts(): Promise<Array<string | null>> {
    const errorName = await this.errortxtName.textContent();
    const errorDescript = await this.errortxtDescription.textContent();
    return [errorName, errorDescript];
  }
  /**
   * @returns true if the save button is disabled
   */
  async saveButtonisNotVisible() {
    return this.saveButtonLocator.isDisabled();
  }
  /**
   * @returns Checks if save button in roles and permissions tab is enabled
   */
  async saveButtonisVisible() {
    return this.saveButtonLocator.isEnabled();
  }
  /**
   * @returns true if the aleret message is visible
   */
  async CheckifCorrectInputs() {
    if (await this.maxErrorTypeLast.isVisible()) {
      const maxErrorMsg = this.maxErrorTypeLast.textContent();
      console.log(maxErrorMsg);
      return maxErrorMsg;
    } else {
      return this.alertMessage.isVisible();
    }
  }
  /**
   * @returns error message when selecting to mage customers
   */
  async getErrorMessageTextinCreateRole(): Promise<string> {
    return await this.errorMessageWhenSelectingCustomers.innerText();
  }
  /**
   * @returns error message text for duplicate role name
   */
  async getErrTxtWhenDuplicateRoleName() {
    await this.roleShouldbeUniqueErrTxt.waitFor({ state: "visible" });

    // Return the text content of the error message
    const errorMessage = await this.roleShouldbeUniqueErrTxt.textContent();
    return errorMessage?.trim() || "";
  }
  /**
   * Verifies that the Delete button is not present in the menu items
   * @returns A boolean indicating if the Delete button is absent
   */
  async isDeleteButtonAbsent(): Promise<boolean> {
    const itemsText = await this.menuItems.allTextContents();

    // Check if "Delete" is not present in the menu items
    return !itemsText.some((text) => text.includes("Delete"));
  }
}
