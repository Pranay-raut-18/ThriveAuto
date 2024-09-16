import { Locator, Page} from "@playwright/test";

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
  private createCustomerButton: Locator;
  private editDetailsOption: Locator;
  private editPrimaryContactDetailsOption: Locator;
  private acceptAlertButton: Locator;
  private saveButton: Locator;
  private rows: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private eMail: Locator;
  private invitePrimaryContactButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFeild = page.getByPlaceholder("Search by name, URL, or primary contact");
    this.customerTable = page.locator(".css-opb0c2");
    this.filterOption = page.getByLabel("Edit Filters");
    this.clickDropDown = page.locator(".MuiInputBase-inputAdornedEnd");
    this.applyButton = page.getByRole("button", { name: "Apply" });
    this.removeFilterStatus = page.locator(".MuiChip-deleteIconFilledColorDefault");
    this.addCustomerButton = page.getByRole("button", { name: "Customer", exact: true,});
    this.nameFeild = page.getByLabel("Name *", { exact: true });
    this.dropDownboxAppear = page.locator('ul[role="listbox"]');
    this.createCustomerButton = page.getByRole("button", { name: "Create Customer", exact: true,});
    this.editDetailsOption = page.getByText("Edit Details");
    this.editPrimaryContactDetailsOption = page.getByText("Edit Primary Contact");
    this.acceptAlertButton = page.locator(".MuiButton-contained");
    this.saveButton = page.getByRole("button", { name: "Save", exact: true });
    this.rows = page.locator(".MuiDataGrid-row");
    this.firstName = page.locator("[name='firstName']");
    this.lastName = page.locator("[name='lastName']");
    this.eMail = page.locator("[name='username']");
    this.invitePrimaryContactButton = page.getByRole("button", { name: "Invite Primary Contact",});
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
   * @returns @cusNameLocator A string representing customer URL.
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
  async selectFromDropdowns(dropDownNumber: number, reqOption: string) {
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
   * Click on "Create customer button".
   */
  async clickOnCreateCustomerButton() {
    await this.createCustomerButton.click();
  }

  /**
   * Get All the Record of a Particular Coloum using Coloum Name
   * @param ColName the coloum name that needs to be verified
   * @returns @customerColText A string representing customer coloum text.
   */
  async getAllRecordofaParticularColoum(ColName: string) {
    let loadMore = true;
    let customerColText:any;
    while (loadMore) {
      await this.rows.first().waitFor();

      for (let i = 0; i < (await this.rows.count()); i++) {
        const row = this.rows.nth(i);
        customerColText = row
          .locator(`[data-field=${ColName}] p`)
          .textContent();
      }

      const lastRow = this.rows.last();
      await lastRow.scrollIntoViewIfNeeded();
      const initialRowCount = await this.rows.count();

      await this.page.waitForLoadState("networkidle");

      const newRowCount = await this.rows.count();
      if (newRowCount <= initialRowCount) {
        loadMore = false;
      }
    }
    return customerColText;
  }

  /**
   * Click on the option button (:) to Edit details, Edit Primary Contact and Disable the customer
   */
  async clickOnOptionButton() {
    this.rows.first();
    await this.rows.first().waitFor();
    const colonButton = this.rows.locator(".css-1n12chd").first();
    colonButton.click();
  }

  /**
   * Click on the Edit details
   */
  async clickOnEditDetailsOption() {
    await this.editDetailsOption.click();
  }

  /**
   * Click on the Edit Primary Contact details
   */
  async clickOnEditPrimaryContactOption() {
    await this.editPrimaryContactDetailsOption.click();
  }

  /**
   * Click on Desired Option
   * @param option the option name to be clicked.
   */
  async clickOnDesiredOption(option: string) {
    await this.page.getByText(option).click();
  }
  /**
   * Click on Alert button
   */
  async clickOnAcceptAlertButton() {
    await this.acceptAlertButton.nth(1).click();
  }

  /**
   * Click on the Save Button
   */
  async clickOnSaveButton() {
    await this.saveButton.click();
  }

  /**
   * Enter Primary Contact First Name in  the first Name Feild
   * @param fName The First name of the Primary contact to be Entered.
   */
  async enterPrimaryContactFirstName(fName: string) {
    await this.firstName.click();
    await this.firstName.fill(fName);
  }

  /**
   * Enter Primary Contact Last Name in the Last Name Feild
   * @param lName The Last name of the Primary contact to be Entered.
   */
  async enterPrimaryContactLastName(lName: string) {
    await this.lastName.click();
    await this.lastName.fill(lName);
  }

  /**
   * Enter Primary Contact Email in the Email Feild
   * @param eMail The Email of the Primary contact to be Entered.
   */
  async enterPrimaryContactEmail(eMail: string) {
    await this.eMail.click();
    await this.eMail.fill(eMail);
  }

  /**
   * Click on "Invite Primary Contact Button"
   */
  async clickOnInvitePrimaryContact() {
    await this.invitePrimaryContactButton.click();
  }

  /**
   * Click on Arrow sort Button"
   * @param feildName for clicking on a particular arrow button feild.
   */
  async clickOnArrowSortButton(feildName: string) {
    const sortArrow = this.page.locator(`div[data-field="${feildName}"]`);
    await sortArrow.click();
  }

  /**
   * Sort Method For a row
   * @param feildName For getting the particular column feild.
   * @param sortOrder For Ascending or Decending Alphabetical Order.
   * @returns @coloumTextContent A string representing particular customer coloum Text content
   * @returns @sortedTextContent A string representing Sorted customer coloum Text content
   */
  async sortMethodForAColumn(fieldName: string, sortOrder: string) {
  const columnTextContent = await this.page.$$eval(
    `div[data-field="${fieldName}"] .MuiTypography-body2`,
    (elements) => elements.map((el) => el.textContent?.trim() || "")
  );

  const sortedTextContent = [...columnTextContent].sort((a: string, b: string) => {
    if (sortOrder === "Ascending") {
      return a.localeCompare(b, undefined, { numeric: true });
    } else if (sortOrder === "Descending") {
      return b.localeCompare(a, undefined, { numeric: true });
    } else {
      throw new Error(`Invalid sortOrder: ${sortOrder}`);
    }
  });

  return { columnTextContent, sortedTextContent };
}

  
}
