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
  private selectCustomerTypeOptionESF: Locator;
  private applyButton: Locator;
  private removePreFilterStatus: Locator;



  private customerTypeOptionESF="Executive Search Firm";

  constructor(page: Page) {
    this.page = page;
    this.searchFeild = page.getByPlaceholder("Search by name, URL, or primary contact");
    this.customerTable= page.locator(".css-opb0c2");
    this.filterOption= page.getByLabel('Edit Filters')
    this.customerType= page.getByLabel('Customer type', { exact: true });
    this.selectCustomerTypeOptionESF= page.getByRole('option', { name: this.customerTypeOptionESF });
    this.applyButton= page.getByRole('button', { name: 'Apply' });
    this.removePreFilterStatus= page.locator(".MuiChip-deleteIconFilledColorDefault");

  }
 
  /**
   * Remove the Filter "Status Active" by clicking (X) button 
   */
  async removepreFilterStatus() {
    await this.removePreFilterStatus.click()
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
   * verifying that Name is visible in the table
   */
  async verifyNameisVisible(Customername) {
    const customerList = this.customerTable;
    const cusnameLocator= customerList.getByText(Customername, { exact: true });
    return cusnameLocator;
  }

  /**
   * verifying that URL is visible in the table
   */
  async verifyURLisVisible(url) {
    const customerList = this.customerTable;
    const cusnameLocator= customerList.getByText(url);
    return cusnameLocator;
  }

  /**
   * verifying that Primary Contact is visible in the table
   */
  async verifyPrimaryContactisVisible(primaryContact) {
    const customerList = this.customerTable;
    const cusnameLocator= customerList.getByText(primaryContact);
    return cusnameLocator;
  }

  /**
   * Click on Filter Option (Symbol). 
   */
  async clickonFilterOption() {
    await this.filterOption.click();
  }

  /**
   * Select the Customer type to "Executive Search Firm" 
   */
  async selectCustomertypeEexcutiveSearchFirm() {
    await this.customerType.click();
    await this.selectCustomerTypeOptionESF.click();
  }
  
  /**
   * Click On "Apply" Button
   */
  async clickOnApplyButton() {
    await this.applyButton.click()
    
  }

  /**
   * Verify all the records of Customer Type
   */
  async VerifyrecordsofCustomerType() {
        let loadMore = true;
        let customerType;
 
        while (loadMore) {
          const rows = this.page.locator('.MuiDataGrid-row');

          await rows.first().waitFor();

          for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);

            customerType = await row.locator('[data-field="customerType"] p').textContent();
            // console.log(`Customer Type: ${customerType}`);
          }
          
          const lastRow = rows.last();
          await lastRow.scrollIntoViewIfNeeded();
          const initialRowCount = await rows.count();

          await this.page.waitForLoadState('networkidle');

          const newRowCount = await rows.count();
          
          if (newRowCount <= initialRowCount) {
            loadMore = false;
          }
        }
        return customerType;
    }


}
