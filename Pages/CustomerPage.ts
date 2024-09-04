import { Locator, Page, expect } from "@playwright/test";

/**
 * Customer page
 * @author Pranay
 */
export class CustomerPage {
  readonly page: Page;
  private searchFeild: Locator;
  private customerTable: Locator;
  private filterOption: Locator;
  private customerType: Locator;
  private customerCategory: Locator;
  private status: Locator;
  private applyButton: Locator;
  private removeFilterStatus: Locator;
  private customerTypeDropdown: Locator;
  private customerStatusDropdown: Locator;
  private customerCategoryDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFeild = page.getByPlaceholder(
      "Search by name, URL, or primary contact"
    );
    this.customerTable = page.locator(".css-opb0c2");
    this.filterOption = page.getByLabel("Edit Filters");
    this.customerType = page.getByLabel("Customer type", { exact: true });
    this.customerCategory = page.getByLabel("Customer category");
    this.status = page.getByPlaceholder("Select Status");
    this.applyButton = page.getByRole("button", { name: "Apply" });
    this.removeFilterStatus = page.locator(
      ".MuiChip-deleteIconFilledColorDefault"
    );
    this.customerTypeDropdown = page.getByRole("listbox", {
      name: "Customer type",
    });
    this.customerStatusDropdown = page.getByRole("listbox", { name: "Status" });
    this.customerCategoryDropdown = page.getByRole("listbox", {
      name: "Customer category",
    });
  }

  /**
   * Remove the Filter "Status Active" by clicking (X) button
   */
  async removePreFilterStatus() {
    await this.removeFilterStatus.click();
  }

  /**
   * Click on Search field.
   */
  async clickOnSearchFeild() {
    await this.searchFeild.click();
  }

  /**
   * Enter the customer name
   */
  async enterName(customername) {
    await this.searchFeild.fill(customername);
  }

  /**
   *  is Name visible in the table
   */
  async isNameVisible(Customername) {
    const customerList = this.customerTable;
    const cusNameLocator = customerList.getByText(Customername, {
      exact: true,
    });
    return cusNameLocator;
  }

  /**
   *  is URL visible in the table
   */
  async isURLVisible(url) {
    const customerList = this.customerTable;
    const cusNameLocator = customerList.getByText(url);
    return cusNameLocator;
  }

  /**
   *  is Primary Contact visible in the table
   */
  async isPrimaryContactVisible(primaryContact) {
    const customerList = this.customerTable;
    const cusNameLocator = customerList.getByText(primaryContact);
    return cusNameLocator;
  }

  /**
   * Click on Filter Option (Symbol).
   */
  async clickOnFilterOption() {
    await this.filterOption.click();
  }

  /**
   *  select Customer Type From Dropdown
   */
  async selectCustomerTypeFromDropdown(reqCT: string) {
    await this.customerType.click();
    await this.customerTypeDropdown.waitFor();
    const desiredOption = this.customerTypeDropdown.getByRole("option", {
      name: reqCT,
      exact: true,
    });
    await desiredOption.click();
  }

  /**
   * Select the Customer Category From Dropdown
   */
  async selectCustomerCategoryFromDropdown(reqCC) {
    await this.customerCategory.click();
    await this.customerCategoryDropdown.waitFor();
    const desiredOption = this.customerCategoryDropdown.getByRole("option", {
      name: reqCC,
      exact: true,
    });
    await desiredOption.click();
  }

  /**
   * Select the Status From Dropdown
   */
  async selectStatusFromDropdown(reqST) {
    await this.status.click();
    // await this.page.pause();
    await this.customerStatusDropdown.waitFor();
    const desiredOption = this.customerStatusDropdown.getByRole("option", {
      name: reqST,
      exact: true,
    });
    await desiredOption.click();
  }

  /**
   * Click On "Apply" Button
   */
  async clickOnApplyButton() {
    await this.applyButton.click();
  }

  /**
   *  is Customer Type visible in the table
   */
  async isCustomerTypeVisible(customerType) {
    const customerList = this.customerTable;
    const cusType = customerList.getByText(customerType).first();
    return cusType;
  }

  /**
   *  is Customer Category visible in the table
   */
  async isCustomerCategoryVisible(customerCategory) {
    const customerList = this.customerTable;
    const cusType = customerList.getByText(customerCategory).first();
    return cusType;
  }

  /**
   *  is Status visible in the table
   */
  async isStatusVisible(status) {
    const customerList = this.customerTable;
    const cusType = customerList.getByText(status).first();
    return cusType;
  }
}
