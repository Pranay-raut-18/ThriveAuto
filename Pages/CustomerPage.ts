import { Locator, Page, expect } from "@playwright/test";

/**
 * Home page
 * @author Pranay
 */
export class CustomerPage {
  readonly page: Page;
  private searchFeild: Locator;
  private customertable: Locator;


  constructor(page: Page) {
    this.page = page;
    this.searchFeild = page.getByPlaceholder("Search by name, URL, or primary contact");
    this.customertable= page.locator(".css-opb0c2");
  }
 
  /**
   * Click on Search field.
   */
  async ClickOnSearchFeild() {
    await this.searchFeild.click();
  }

  /**
   * Enter the customer name
   */
  async enterName(customername) {
    await this.searchFeild.fill(customername);
  }

  /**
   * verifying that Name is visible in the table
   */
  async verifyNameisVisible(Customername) {
    const customerList = this.customertable;
    const cusnameLocator= customerList.getByText(Customername, { exact: true });
    return cusnameLocator;
  }

  /**
   * verifying that URL is visible in the table
   */
  async verifyURLisVisible(url) {
    const customerList = this.customertable;
    const cusnameLocator= customerList.getByText(url);
    return cusnameLocator;
  }

  /**
   * verifying that Primary Contact is visible in the table
   */
  async verifyPrimaryContactisVisible(primaryContact) {
    const customerList = this.customertable;
    const cusnameLocator= customerList.getByText(primaryContact);
    return cusnameLocator;
  }
}
