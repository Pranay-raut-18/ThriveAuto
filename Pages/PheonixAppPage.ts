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
  private createJobButton: Locator;
  private createPersonButton: Locator;
  private jobFNameInput: Locator;
  private jobLNameInput: Locator;
  private jobEmail: Locator;
  private jobLinkedUrlInput: Locator;
  private saveButtonPerson: Locator;
  public saveButtonProject: Locator;
  private titleFieldinProject: Locator;
  private hiringCompanyFieldinProject: Locator;
  private teamLeadFieldinProject: Locator;
  private editButtoninCompanyTab: Locator;
  private saveButtoninEditCompany: Locator;
  private editButtoninEditJobs: Locator;
  private popUpinPersonEditTab: Locator;
  private editDivinPersonTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.locator(
      'input[placeholder="Search by name, title, company, sector..."]'
    );
    this.peopleViewTab = page.locator(".MuiStack-root.css-7d0zx8");
    this.searchCompanyBar = page.locator(
      'input[placeholder="Search by name, location, sector..."]'
    );
    this.companyViewTab = page.locator(".MuiStack-root.css-1g4yje1");
    this.searchBarinProjects = page.locator(
      'input[placeholder="Search by title, hiring company, sector…"]'
    );
    this.jobCards = page.locator(".MuiCard-root");
    this.AddButtonPA = page.getByLabel("Open Action Menu").first();
    this.createCompanyButton = page.getByRole("menuitem", {
      name: "Create Company",
    });
    this.createJobButton = page.getByRole("menuitem", {
      name: "Create Project",
    });
    this.createPersonButton = page.getByRole("menuitem", {
      name: "Add Person",
    });
    this.companyNameInput = page.locator(
      'input[name="name"][placeholder="Enter Company Name"]'
    );
    this.jobFNameInput = page.locator('input[name="firstName"]');
    this.jobLNameInput = page.locator('input[name="lastName"]');
    this.jobEmail = page.locator('input[placeholder="Enter Email"]');
    this.jobLinkedUrlInput = page.locator(
      'input[placeholder="Paste LinkedIn URL"]'
    );
    this.titleFieldinProject = page.getByLabel("Title *");
    this.hiringCompanyFieldinProject = page.getByLabel("Hiring company *");
    this.teamLeadFieldinProject = page.getByLabel("Team lead");
    this.saveButtonCompany = page
      .locator('button[type="button"]:has-text("Continue")')
      .first();
    this.saveButtonPerson = page.locator(
      'button[type="button"]:has-text("Continue")'
    );
    this.saveButtonProject = page.locator(
      'button[type="button"]:has-text("Create Project")'
    );
    this.editButtoninCompanyTab = page.locator(
      ".MuiButtonBase-root.MuiIconButton-sizeSmall.css-1sl9f94"
    );
    this.saveButtoninEditCompany = page.getByRole("button", { name: "Save" });
    this.editButtoninEditJobs = page.locator(".css-1sy0xge button");
    this.popUpinPersonEditTab = page.locator(".css-afwwpk button");
    this.editDivinPersonTab = page.locator(".css-xhilgd");
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
    await this.peopleViewTab.waitFor({ state: "visible" });
    return this.peopleViewTab.isVisible();
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
    const tab = this.getTabByButton(name).first();
    await tab.click();
    await this.companyViewTab.waitFor();
  }
  /**
   *Checks if view tab in company is visible or not
   * @returns true if company view tab is visible
   */
  async companyViewbarisVisible(): Promise<boolean> {
    await this.companyViewTab.waitFor();
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
  /**
   * Clicks on create prject button in phoenix app
   * @returns Clicks on create project button in menu
   */
  async clickOnCreateProjects() {
    return this.createJobButton.click();
  }
  /**
   * Clicks on create a new person in phoenix app
   * @returns Clicks on create a new person in menu
   */
  async clickOnCreatePerson() {
    return this.createPersonButton.click();
  }
  /**
   * Fills all the input fields in create new person tab
   * @param fname fills the first name passed as argument
   * @param lname fills the last name passed as argument
   * @param email fills the email passed as argument
   * @param linkedinurl fills the linkedin url passed as an argument
   */
  async fillPersonNameEmail(
    fname: string,
    lname: string,
    email: string,
    lurl: string
  ) {
    await this.jobFNameInput.fill(fname);
    await this.jobLNameInput.fill(lname);
    await this.jobEmail.fill(email);
    await this.jobLinkedUrlInput.fill(lurl);
  }
  /**
   * checks wheather the save button in
   * @returns true if the save button is visible or not
   */
  async isSavePersonButtonVisible(): Promise<boolean> {
    return this.saveButtonPerson.isEnabled();
  }
  /**
   * Fills the title in menu of projects
   * @param title Title in menu of projects to be filled passed as argument
   */
  async fillTitleinProject(title: string): Promise<void> {
    await this.titleFieldinProject.click();
    await this.titleFieldinProject.fill(title);
  }

  /**
   * Fill hiring company name and select from dropdown
   * @param companyName company name to be selected passed as argument
   */
  async fillHiringCompanyinProject(companyName: string): Promise<void> {
    await this.hiringCompanyFieldinProject.fill(companyName);
    // Wait for the dropdown options to appear
    await this.page.waitForSelector(".MuiAutocomplete-option");
    // Select the desired option from the dropdown
    await this.page.click(`.MuiAutocomplete-option >> text=${companyName}`);
  }

  /**
   * Fills the teamlead and selects from the dropdown
   * @param teamLead selects the team lead passed as an argument
   */
  async fillTeamLeadinProject(teamLead: string): Promise<void> {
    await this.teamLeadFieldinProject.fill(teamLead);
    // Wait for the dropdown options to appear
    await this.page.waitForSelector(".MuiAutocomplete-option");
    // Select the desired option from the dropdown
    await this.page.click(`.MuiAutocomplete-option >> text=${teamLead}`);
  }

  /**
   * Fills the full form by calling 3 method to get desired input
   * @param title fills the title passed as argument
   * @param companyName fills the company name passed as argument
   * @param teamLead fills the team lead passed as argument
   */
  async fillProjectDetailsinProject(
    title: string,
    companyName: string,
    teamLead: string
  ): Promise<void> {
    await this.fillTitleinProject(title);
    await this.fillHiringCompanyinProject(companyName);
    await this.fillTeamLeadinProject(teamLead);
  }
  /**
   * @returns clicks on edit button in selected company tab
   */
  async clickonEditButtoninCompanyTab() {
    return this.editButtoninCompanyTab.click();
  }
  /**
   * @returns Clicks on Save Button in Edit company tab
   */
  async clickonSaveButtoninEditCompanyTab() {
    return this.saveButtoninEditCompany.click();
  }
  /**
   *@returns true if edit button is visible
   */
  async isEditButtoninJobsVisible(): Promise<boolean> {
    await this.editButtoninEditJobs.waitFor();
    return this.editButtoninEditJobs.isVisible();
  }
  /**
   * Clicks on popup in edit people tab
   */
  async clickonPopupInEditPeople() {
    return this.popUpinPersonEditTab.click();
  }
  /**
   * Clicks on edit people in edit people tab
   */
  async clickonEditPeopleinEditPeopleTab() {
    await this.editDivinPersonTab.hover();
    return this.page
      .locator(
        ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall.css-1a1fzv4"
      )
      .click();
  }
  /**
   * Gets the text content of the success alert.
   * @returns The text content of the success alert div.
   */
  async getSuccessAlertTextinPeopleEdit(): Promise<string> {
    const alertLocator = this.page.locator(
      ".MuiPaper-root.MuiAlert-root.MuiAlert-colorSuccess .MuiAlert-message"
    );
    await alertLocator.waitFor();
    const alertText = await alertLocator.innerText();
    return alertText;
  }
}
