import { Locator, Page, expect } from "@playwright/test";

/**
 * User page
 * @author Pranay
 */

export class UserPagePr {

  readonly page: Page;
  private accountButton: Locator;
  private myAccountOption: Locator;
  private passwordAndSecurityOption: Locator;
  private passwordAndSecurityOptionDEV: Locator;
  private updatePasswordButton: Locator;
  private currentPasswordInputFeild: Locator;
  private newPasswordInputFeild: Locator;
  private confrimNewPasswordInputFeild: Locator;
  private saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountButton = page.locator(".css-174ic5k");
    this.myAccountOption = page.getByText("My Account");
    this.passwordAndSecurityOption = page.locator("#user-preferences-tab-password-and-security");
    this.passwordAndSecurityOptionDEV = page.getByRole('tab', { name: 'Passwords And Security' });
    this.updatePasswordButton = page.getByRole("button",{name: "Update Password"});
    this.currentPasswordInputFeild = page.locator("[name='currentPassword']");
    this.currentPasswordInputFeild = page.locator("[name='currentPassword']");
    this.newPasswordInputFeild = page.locator("[name='password']");
    this.confrimNewPasswordInputFeild = page.locator("[name='passwordConfirmation']");
    this.saveButton = page.getByRole("button",{name: "Save"});
  }
    
  /**
   * Enter New password.
   * @param newpass Enter new Password
   */
  async enterNewPassword(newpass:string) {
    await this.newPasswordInputFeild.fill(newpass);
  }

  /**
   * Enter Confrim New password.
   * @param Confrimpass Entering Confrim Password.
   */
  async enterConfrimNewPassword(Confrimpass:string) {
    await this.confrimNewPasswordInputFeild.fill(Confrimpass);
  }

  /**
   * Enter current password.
   * @param currentpass Enter Current Password
   */
  async enterCurrentPassword(currentpass:string) {
    await this.currentPasswordInputFeild.fill(currentpass);
  }

  /**
   * Click on Save Button.
   */
  async clickOnSaveButton() {
    await this.saveButton.click();
  }

  /**
   * Click on Update Password Button.
   */
  async clickOnUpdatePasswordButton() {
    await this.updatePasswordButton.click();
  }

  /**
   * Click on Account Button.
   */
  async clickOnAccountButton() {
    await this.accountButton.click();
  }

  /**
   * Click on My Account Option.
   */
  async clickOnMyAccountOption() {
    await this.myAccountOption.click();
  }

  /**
   * Click on Passwords & Security Option.
   */
  async clickOnPasswordsAndSecurityOption() {
    await this.passwordAndSecurityOption.click();
  }

  /**
   * Click on Passwords & Security Option.
   */
  async clickOnPasswordsAndSecurityOptionDEV() {
    const divPassAndSec= this.page.locator(".MuiStack-root.css-1g4yje1");
    await divPassAndSec.waitFor();
    await this.passwordAndSecurityOptionDEV.click();
  }

  /**
   * Click on Header Column"
   * @param feildName for clicking on a particular arrow button feild.
   */
  async clickOnHeaderColumn(feildName: string) {
    const tabName = this.page.locator(`//div[contains(text(),"${feildName}")]`);
    await tabName.click();
  }

  /**
   * Sort Method For a Coloum
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

    const sortedTextContent = [...columnTextContent].sort(
      (a: string, b: string) => {
        if (sortOrder === "Ascending") {
          return a.localeCompare(b, undefined, { numeric: true });
        } else if (sortOrder === "Descending") {
          return b.localeCompare(a, undefined, { numeric: true });
        } else {
          throw new Error(`Invalid sortOrder: ${sortOrder}`);
        }
      }
    );

    return { columnTextContent, sortedTextContent };
  }



}