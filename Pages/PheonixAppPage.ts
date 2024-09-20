import { Locator, Page } from "@playwright/test";

/**
 *  PheonixAppPage page
 * @author Vallail N
 */

export class PheonixAppPage {
  readonly page: Page;
  private searchBar: Locator;
  private peopleViewTab: Locator;
  private searchCompanyBar: Locator;
  private companyViewTab: Locator;
  private searchBarinProjects: Locator;
  private jobCards: Locator;
  private AddButtonPA: Locator;
  private createCompanyButton: Locator;
  private companyNameInput: Locator;
  private saveButtonCompany: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.locator(
      'input[placeholder="Search by contact information, domain expertise, or skills..."]'
    );
    this.peopleViewTab = page.locator(".MuiStack-root.css-7d0zx8");
    this.searchCompanyBar = page.locator(
      'input[placeholder="Search by location, sectors, revenue, headcount, or ownership..."]'
    );
    this.companyViewTab = page.locator(".MuiStack-root.css-ak720g");
    this.searchBarinProjects = page.locator(
      'input[placeholder="Search by hiring company, title and project team members..."]'
    );
    this.jobCards = page.locator(".MuiCard-root");
    this.AddButtonPA = page.getByLabel("Open Action Menu").first();
    this.createCompanyButton = page.getByRole("menuitem", {
      name: "Create New Company",
    });
    this.companyNameInput = page.locator(
      'input[name="name"][placeholder="Enter Company Name"]'
    );
    this.saveButtonCompany = page
      .locator('button[type="submit"]:has-text("Continue")')
      .first();
  }

  /**
   *Gets the locator dynamically
   * @param name gets the locator for the name passed as argument
   * @returns returns the locator for name passed as argument
   */
  getTabByName(name: string): Locator {
    return this.page.getByRole("link", { name });
  }
  /**
   * Clicks on tab by the name passed as argument
   * @param name name of tab to be cliked on
   */
  async clickTabByName(name: string): Promise<void> {
    const tab = this.getTabByName(name);
    await tab.click();
  }
  /**
   * Clicks on search bar in people tab
   */
  async clickOnSearchBar(): Promise<void> {
    await this.searchBar.click();
  }
  /**
   * Clicks on search bar in company tab
   */
  async clickOnCompanySearchBar(): Promise<void> {
    await this.searchCompanyBar.click();
  }
  /**
   *Fills the name on search bar in company tab
   */
  async entercompanyToSearch(text: string): Promise<void> {
    await this.searchCompanyBar.fill(text);
    await this.searchCompanyBar.press("Enter");
  }
  /**
   *Fills the name on search bar
   */
  async enterTextToSearch(text: string): Promise<void> {
    await this.searchBar.fill(text);
    await this.searchBar.press("Enter");
  }
  /**
   * Clicks on the Search name
   * @param name Clicks on name passed as argument
   */
  async clickSearchResultByName(name: string): Promise<void> {
    await this.page.getByRole("button", { name }).click();
  }
  /**
   *Checks for view tab is visible or not
   * @returns returns true if the view tab is visible of person
   */
  async checkifNameinViewisVisible(): Promise<boolean> {
    return await this.peopleViewTab.isVisible();
  }
  /**
   * Gets the locator of company
   * @param name name of company to get locator of
   * @returns locator for button according to the name passed
   */
  getTabByButton(name: string): Locator {
    return this.page.getByRole("button", { name });
  }
  /**
   *Clicks on name of company passed as argument
   * @param name name of company passed as argument
   */
  async clickTabByCompanyButton(name: string): Promise<void> {
    const tab = this.getTabByButton(name);
    await tab.click();
    await this.companyViewTab.waitFor();
  }
  /**
   *Checks if view tab in company is visible or not
   * @returns true if company view tab is visible
   */
  async companyViewbarisVisible(): Promise<boolean> {
    return await this.companyViewTab.isVisible();
  }
  /**
   * Clicks on searchbar in projects
   */
  async ClickonSearchbarinProjects() {
    this.searchBarinProjects.click();
  }
  async fillinSearchofProjects(text: string): Promise<void> {
    await this.searchBarinProjects.fill(text);
    await this.searchBarinProjects.press("Enter");
  }
  /**
   * Clicks on a job title based on the company name.
   * @param jobTitle The title of the job (e.g., 'VP Finance').
   * @param companyName The name of the company (e.g., 'tesla').
   */
  async clickJobByTitleAndCompany(
    jobTitle: string,
    companyName: string
  ): Promise<void> {
    await this.jobCards.first().waitFor();
    const jobCount = await this.jobCards.count();

    for (let i = 0; i < jobCount; i++) {
      const card = this.jobCards.nth(i);

      const title = await card.locator(".MuiTypography-subtitle1").innerText();
      const company = await card
        .locator(".MuiTypography-root.css-iy90w1")
        .first()
        .innerText();

      if (
        title.trim() === jobTitle &&
        company.trim().toLowerCase() === companyName.toLowerCase()
      ) {
        await card.locator(".MuiTypography-subtitle1").click();
        break;
      }
    }
  }
  /**
   * Clicks on "+" button in pheonix application
   */
  async clickonAcitonButton() {
    await this.AddButtonPA.click();
  }
  /**
   * Clicks on "create a new company" button in menu
   */
  async clickOnCreateNewCompanyButton() {
    await this.createCompanyButton.click();
  }
  /**
   * Fills company name in input bar
   * @param name name passed as an argument to this function
   */
  async enterCompanyName(name: string) {
    await this.companyNameInput.fill(name);
  }
  /**
   * Checks if continue button is visible
   * @returns true if continue button is visible
   */
  async isSaveCompanyButtonVisible(): Promise<boolean> {
    return this.saveButtonCompany.isEnabled();
  }
}
