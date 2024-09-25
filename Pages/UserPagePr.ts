import { Locator, Page, expect } from "@playwright/test";

/**
 * User page
 * @author Akhil
 */

export class UserPagePr {


    
  // -------------------------------------------------
  /**
   * Click on Arrow sort Button"
   * @param feildName for clicking on a particular arrow button feild.
   */
  async clickOnArrowSortButton(feildName: string) {
    const sortArrow = this.page.locator(`div[data-field="${feildName}"] button`);
    await sortArrow.click();
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
  // -------------------------------------------------

}