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
  private selectCustomerTypeOptionESF: Locator;
  private selectCustomerTypeOptionEnterprise: Locator;
  private selectCustomerTypeOptionVentureCapital: Locator;
  private selectCustomerTypeOptionPrivateEquity: Locator;
  private selectCustomerCategoryOptionDemo: Locator;
  private selectStatusOptionActive: Locator;
  private applyButton: Locator;
  private removePreFilterStatus: Locator;
  private tRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFeild = page.getByPlaceholder("Search by name, URL, or primary contact");
    this.customerTable= page.locator(".css-opb0c2");
    this.filterOption= page.getByLabel('Edit Filters')
    this.customerType= page.getByLabel('Customer type', { exact: true });
    this.customerCategory= page.getByLabel('Customer category');
    this.status= page.getByPlaceholder('Select Status');
    this.selectCustomerTypeOptionESF= page.getByRole('option', { name: "Executive Search Firm" });
    this.selectCustomerTypeOptionEnterprise= page.getByRole('option', { name: 'Enterprise' })
    this.selectCustomerTypeOptionVentureCapital= page.getByRole('option', { name: 'Venture Capital' })
    this.selectCustomerTypeOptionPrivateEquity= page.getByRole('option', { name: 'Private Equity' })
    this.selectCustomerCategoryOptionDemo= page.getByRole('option', { name: 'Demo' });
    this.selectStatusOptionActive= page.getByRole('option', { name: 'Active' });
    this.applyButton= page.getByRole('button', { name: 'Apply' });
    this.removePreFilterStatus= page.locator(".MuiChip-deleteIconFilledColorDefault");
    this.tRows= page.locator('.MuiDataGrid-row');

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
   * Select the Customer type to "Enterprise" 
  */
 async selectCustomertypeEnterprise() {
   await this.customerType.click();
    await this.selectCustomerTypeOptionEnterprise.click();
  }

  /**
   * Select the Customer type to "Venture Capital" 
  */
 async selectCustomertypeVentureCapital() {
   await this.customerType.click();
    await this.selectCustomerTypeOptionVentureCapital.click();
  }
  
  /**
   * Select the Customer type to "Private Equity" 
  */
 async selectCustomertypePrivateEquity() {
   await this.customerType.click();
    await this.selectCustomerTypeOptionPrivateEquity.click();
  }
  
  /**
   * Select the Customer type to "Private Equity" 
  */
 async selectCustomerCategoryDemo() {
    await this.customerCategory.click();
    await this.selectCustomerCategoryOptionDemo.click();
  }

  /**
   * Select the Customer type to "Private Equity" 
  */
 async selectStatusActive() {
    await this.status.click();
    await this.selectStatusOptionActive.click();
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
          const rows = this.tRows;

          await rows.first().waitFor();

          for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);

            customerType = await row.locator('[data-field="customerType"] p').textContent();
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
    
    /**
     * Verify all the records of Customer Category
     */
    async VerifyrecordsofCustomerCategory() {
          let loadMore = true;
          let customerCategory;
   
          while (loadMore) {
            const rows = this.tRows;
  
            await rows.first().waitFor();
  
            for (let i = 0; i < await rows.count(); i++) {
              const row = rows.nth(i);
  
              customerCategory = await row.locator('[data-field="customerCategory"] p').textContent();
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
          return customerCategory;
      }
    /**
     * Verify all the records of Status
     */
    async VerifyrecordsofStatus() {
          let loadMore = true;
          let status;
   
          while (loadMore) {
            const rows = this.tRows;
  
            await rows.first().waitFor();
  
            for (let i = 0; i < await rows.count(); i++) {
              const row = rows.nth(i);
  
              status = await row.locator('[data-field="customerStatus"] p').textContent();
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
          return status;
      }




}
