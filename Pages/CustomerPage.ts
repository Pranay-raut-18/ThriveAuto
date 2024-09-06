import { Locator, Page } from "@playwright/test";

/**
 * Customer page
 * @author Pranay
 */
export class CustomerPage {
  readonly page: Page;
  private searchFeild: Locator;
  private customerTable: Locator;
  private filterOption: Locator;
  private clickDropDown: Locator;
  private applyButton: Locator;
  private removeFilterStatus: Locator;
  private addCustomerButton: Locator;
  private nameFeild: Locator;
  private dropDownboxAppear: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFeild = page.getByPlaceholder("Search by name, URL, or primary contact");
    this.customerTable = page.locator(".css-opb0c2");
    this.filterOption = page.getByLabel("Edit Filters");
    this.clickDropDown=page.locator(".MuiInputBase-inputAdornedEnd")
    this.applyButton = page.getByRole("button", { name: "Apply" });
    this.removeFilterStatus = page.locator(".MuiChip-deleteIconFilledColorDefault");
    this.addCustomerButton = page.getByRole('button', { name: 'Customer', exact: true });
    this.nameFeild = page.getByLabel('Name *', { exact: true });
    this.dropDownboxAppear = page.locator('ul[role="listbox"]');
  }

  /**
   * Remove the Filter "Status Active" by clicking (X) button
   */
  async removePreFilterStatus() {
    await this.removeFilterStatus.click();
  }

  /**
   * Click on Search Feild.
   */
  async clickOnSearchFeild() {
    await this.searchFeild.click();
  }

  /**
   * Enter the customer name in  the search Feild
   * @param customername The name of the customer to be searched.
   */
  async enterCustomerNameinSearchFeild(customername: string) {
    await this.searchFeild.fill(customername);
  }

  /**
   *  is URL visible in the table
   * @param url The URL of the customer to be searched.
   * @returns A string representing customer URL.
   */
  async isURLVisible(url: string) {
    const customerList = this.customerTable;
    const cusNameLocator = customerList.getByText(url);
    return cusNameLocator;
  }

  /**
   * Click on Filter Option (Symbol).
   */
  async clickOnFilterOption() {
    await this.filterOption.click();
  }

  /**
   * Select From Dropdowns
   * @param reqOption The Option that is selected from the dropdown.
   * @param dropDownNumber the DropDown Number 0-Customer_Type, 1- Customer_Category, 2-Status  
   */
  async selectFromDropdowns(dropDownNumber:number,reqOption: string) {
    await this.clickDropDown.nth(dropDownNumber).click();
    await this.dropDownboxAppear.waitFor();
    const desiredOption = this.dropDownboxAppear.getByRole("option", {
      name: reqOption,
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
   * Click On "+ Customer" Button
   */
  async clickOnAddCustomerButton() {
    await this.addCustomerButton.click();
  }
  
  /**
   * Enter the customer name in  the Name Feild
   * @param nameFeild The name of the customer to be Entered.
  */
 async enterCustomerNameinNameFeild(nameFeild: string) {
    await this.nameFeild.click();
    await this.nameFeild.fill(nameFeild);
  }

  /**
   * Get All the Record of a Particular Coloum using Coloum Name
   * @param ColName the coloum name that needs to be verified
   * @returns A string represting customer coloum text.
   */
  async getAllRecordofaParticularColoum(ColName: string) {
    let loadMore = true;
    let customerColText;
    while (loadMore) {
      const rows = this.page.locator(".MuiDataGrid-row");
      await rows.first().waitFor();

      for (let i = 0; i < (await rows.count()); i++) {
        const row = rows.nth(i);
        customerColText = await row.locator(`[data-field=${ColName}] p`).textContent();
      }

      const lastRow = rows.last();
      await lastRow.scrollIntoViewIfNeeded();
      const initialRowCount = await rows.count();

      await this.page.waitForLoadState("networkidle");

      const newRowCount = await rows.count();
      if (newRowCount <= initialRowCount) {
        loadMore = false;
      }
    }
    return customerColText;
  }
}
