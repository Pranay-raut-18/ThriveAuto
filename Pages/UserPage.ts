import { Locator, Page, expect } from "@playwright/test";
import { promises } from "dns";

/**
 * User page
 * @author Akhil
 */

export class UserPage {
    readonly page: Page;
    private customerTabButton: Locator;
    private addUserIcon: Locator;
    public addUserForm: Locator;
    private statusDisableButton: Locator;
    private searchBox: Locator;
    private filterResetButton: Locator;
    private filterApplyButton: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private emailField: Locator;
    public  roleField: Locator;
    private roleDropdownOptions: Locator;
    private save: Locator;
    private successMessage: Locator;
    private userListing: Locator;
    private invalidEmailMessage: Locator;
    private uniqueEmailMessage: Locator;
    private duplicateEmail: Locator;
    private userFirstRow: Locator;
    private userFirstRowName: Locator;
    private userFirstRowStatus: Locator;
    private userFirstRowEmail: Locator;
    private userFirstRowCreatedDate: Locator;
    private userFirstRowRole: Locator;
    private cancelButton: Locator;
    private noResultsText: Locator;
    private linkedInUrlDescription: Locator
    private statusActiveChip: Locator;
    private searchBar: Locator;
    private linkedInFeild: Locator;
    private invalidLinkedInmessage: Locator;
    private enterFNameMessage: Locator;
    private enterLNameMessage: Locator;
    private enterRoleMessage: Locator;
    private editFieldBoxes:Locator;
    private editFieldSaveButton:Locator;
    private editDots: Locator;
    private editOptions: Locator;
    private filterIcon:Locator;
    private filterRoleFeild:Locator;
    private filterChips: Locator;
    private filterCreatedByField: Locator;
    private filterCreateByFieldDropdown: Locator;
    private filterStatusField: Locator;
    private filterStatusDropdown: Locator;
    private calendar: Locator;
    private selectDateField: Locator;
<<<<<<< HEAD
    private disableConfirmationButton: Locator;
    private enableCofirmationButton: Locator;
    public  popUp: Locator;
=======
>>>>>>> e1e879f3d30e56a3f9ca5c28742a8cbd06ca366c


    constructor(page: Page) {
        this.page = page;
        this.customerTabButton = page.locator('p', { hasText: 'Customers' });
        this.addUserIcon = page.locator("button:text('User')");
        this.addUserForm = page.locator("div.MuiPaper-elevation16");
        this.statusDisableButton = page.locator("//div[@class='MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorDefault MuiChip-deletable MuiChip-deletableColorDefault MuiChip-filledDefault css-7lzqhs']//*[name()='svg']");
        this.filterResetButton = page.locator("text='Reset'");
        this.filterApplyButton = page.locator("text='Apply'");
        this.searchBox = page.locator("[placeholder='Search by name or email']");
        this.firstNameField = page.locator("[name='firstName']");
        this.lastNameField = page.locator("[name='lastName']");
        this.emailField = page.locator("[name='email']");
        this.roleField = page.locator("[role='combobox']");
        this.roleDropdownOptions = page.getByRole('listbox', { name: 'Role' });
        this.save = page.locator('[type="submit"]');
        this.successMessage = page.locator("//div[@class='MuiAlert-message css-1xsto0d']");
        this.userListing = page.locator("div.MuiDataGrid-virtualScroller");
        this.invalidEmailMessage = page.locator("text='Please enter a valid email'");
        this.uniqueEmailMessage = page.locator("text='must be unique'");
        this.duplicateEmail = page.locator("div.MuiBox-root  a").nth(2);
        this.userFirstRow = page.locator('[data-rowindex="0"]');
        this.userFirstRowName = page.locator('[data-rowindex="0"] p').nth(0);
        this.userFirstRowCreatedDate = page.locator('[data-rowindex="0"] p').nth(1);
        this.userFirstRowStatus = page.locator('[data-colindex="3"] p').first();
        this.userFirstRowEmail = page.locator('[data-rowindex="0"] a');
        this.userFirstRowRole = page.locator('[data-rowindex="0"] div [title="Admin"]');
        this.cancelButton = page.locator("text='Cancel'");
        this.noResultsText = page.locator("text='No results'");
        this.linkedInUrlDescription = page.getByText('Entering a LinkedIn URL');
        this.statusActiveChip = page.locator(" text='Status: Active'");
        this.searchBar = page.locator("div.MuiInputBase-root");
        this.linkedInFeild = page.locator("[name='linkedinUrl']");
        this.invalidLinkedInmessage = page.locator('text="Please enter the LinkedIn URL in this format: https://linkedin.com/in/<unique identifier>"');
        this.enterFNameMessage = page.locator("text='Please enter a first name'");
        this.enterLNameMessage = page.locator("text='Please enter a last name'");
        this.enterRoleMessage = page.locator("text='Please select a role for this user'");
        this.editFieldBoxes = page.locator("input.MuiInputBase-input ");
        this.editFieldSaveButton = page.locator('//button[text()="Save"]');
        this.editDots = page.locator('[data-colindex="4"]');
        this.editOptions = page.locator('[role="menuitem"]');
        this.filterIcon = page.getByLabel('Edit Filters');
        this.filterRoleFeild = page.getByRole('combobox', { name: 'Role' });
        this.filterChips = page.locator('.css-7lzqhs');
        this.filterCreatedByField = page.locator("text='Created by'").first();
        this.filterCreateByFieldDropdown=page.getByRole('listbox', { name: 'Created by' });
        this.filterStatusField=page.getByPlaceholder('Select Status');
        this.filterStatusDropdown=page.getByRole('listbox', { name: 'Status' });
        this.calendar=page.locator('.css-1xhj18k');
        this.selectDateField=page.locator('[placeholder="MM/DD/YYYY"]');
<<<<<<< HEAD
        this.disableConfirmationButton=page.locator("text='Disable'");
        this.enableCofirmationButton=page.locator("text='Enable'").nth(1);
        this.popUp=this.page.locator(".css-1ktdlx3")
        
=======
>>>>>>> e1e879f3d30e56a3f9ca5c28742a8cbd06ca366c
        
    }

  /**
   * Clicks On Customer Tab
   */
  async clickOnCustomerTab() {
    await this.customerTabButton.click();
  }

  /**
   * Clears pre-applied filter
   */
  async clearFilter() {
    await this.statusDisableButton.click();
    await this.page.waitForTimeout(2000);
  }

  /**
   * Clicks on Add User Icon
   */
  async clickOnAddUserIcon() {
    await this.addUserIcon.waitFor();
    await this.addUserIcon.click();
  }

  /**
   * Is Add User Form Visible
   * @returns A boolean indicating whether the AddUser form is visible
   */
  async isAddUserFormVisible(): Promise<boolean> {
    return await this.addUserForm.isVisible();
  }

  /**
   * Enters First Name
   * @param firstName The first name of the user to be entered into the form
   */
  async enterFirstName(firstName: string) {
    await this.firstNameField.fill(firstName);
  }

  /**
   * Enters Last Name
   * @param lastName The last name of the user to be entered into the form
   */
  async enterLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  /**
   * Enters email
   * @param email The email id of the user to be entered into the form
   */
  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  /**
   * Enters LinkedInUrl
   * @param linkedinurl The linkedIn Url of the user to be entered into the form
   */
  async enterLinkedInUrl(linkedinurl: string) {
    await this.linkedInFeild.fill(linkedinurl);
  }

  /**
   * Gets the Invalid LinkedIn URL Format error message
   * @returns A string representing the invalid LinkedIn Url format message
   */
  async getLinkedInUrlErrorMessage(): Promise<string | null> {
    return await this.invalidLinkedInmessage.textContent();
  }

  /**
   * Clicks on Role button
   */
  async clickOnRoleButton() {
    await this.roleField.click();
  }

  /**
   * Selects Role from Dropdown
   * @param role The specific role to be selected from the dropdown options.
   */
  async selectRoleFromDropdown(role: string) {
    await this.roleDropdownOptions.waitFor();
    const desiredOption = this.roleDropdownOptions.getByRole("option", {
      name: role,
      exact: true,
    });
    await desiredOption.click();
  }

  /**
   * Gets all the Roles from Dropdown
   * @returns arr-An array containg all the roles displayed in roles drop-down.
   */
  async getRolesFromDropdown() {
    await this.roleDropdownOptions.waitFor();
    const arr = await this.roleDropdownOptions.allInnerTexts();
    return arr;
  }

  /**
   * Enters all the fields of Add User form
   * @param firstName The first name of the user to be entered into the form
   * @param lastName The last name of the user to be entered into the form
   * @param email The email id of the user to be entered into the form
   * @param role The specific role to be selected from the dropdown options.
   */
  async enterAllFields(
    firstName: string,
    lastName: string,
    email: string,
    role: string
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.roleField.click();
    await this.roleDropdownOptions.waitFor();
    const desiredOption = this.roleDropdownOptions.getByRole("option", {
      name: role,
      exact: true,
    });
    await desiredOption.click();
  }

  /**
   * Clicks on Add and Send Invite
   */
  async clickAddButton() {
    await this.save.click();
  }

  /**
   * Gets the Success Message
   * @returns A string representing the success message displayed upon successfully adding a new user.
   */
  async getSuccessMessage(): Promise<string | null> {
    await this.successMessage.waitFor();
    return await this.successMessage.textContent();
  }

  /**
   * Gets the newly added user's email
   * @param email The email address of the user to find in the list.
   * @returns emailLocator-The locator pointing to the email of the newly added user.
   */
  async getNewlyAddedUserEmail(email: string): Promise<Locator> {
    const emailLocator = this.userListing.locator(`text="${email}"`);
    return emailLocator;
  }

  /**
   * Is Add and Send Invite Button disabled
   * @returns A boolean indicating whether the Add and Send Invite button is disabled or not.
   */
  async isAddAndSendInviteButtonDisabled(): Promise<boolean> {
    return await this.save.isDisabled();
  }

  /**
   * Gets the Invalid Email Format error message
   * @returns A string representing the error message displayed when the email format is invalid.
   */
  async getInvalidEmailMessage(): Promise<string | null> {
    return await this.invalidEmailMessage.textContent();
  }

  /**
   * Gets an existing email from user list
   * @returns A string containing the email address of a user that already exists in the list.
   */
  async getExistingEmail(): Promise<string | null> {
    return await this.duplicateEmail.textContent();
  }

  /**
   * Gets the  Unique Email error message
   * @returns A string representing the error message displayed when the email id entered is not unique.
   */
  async getUniqueEmailMessage(): Promise<string | null> {
    return await this.uniqueEmailMessage.textContent();
  }

  /**
   * Gets the Newly Added user Credentials from user list
   * @returns An Array of strings containing the email address,name and role of the newly added user.
   */
  async getNewUserCredentialsFromUserList(): Promise<Array<string | null>> {
    const name = await this.userFirstRowName.textContent();
    const email = await this.userFirstRowEmail.textContent();
    const role = await this.userFirstRowRole.textContent();
    return [name, email, role];
  }

  /**
   * Clicks on Cancel Button
   */
  async clickOnCancelButton() {
    await this.cancelButton.click();
  }

  /**
   * Enters Name in the search field
   * @param name The name to be entered in the search field
   */
  async enterNameInSearchField(name: string) {
    await this.searchBox.fill(name);
  }

    /**
     * Is searched attribute(name ,email,createdBy and role) displayed in user list
     * @param value The value that is entered by the user in the search field
     * @param colname The attribute that the user want to search(name,email,createdBy and role)
     * @returns A boolean value indicating whether the searched attribute is displayed in user list or not.
     */
    async isSearchedAttributeDisplayedInUserList(value:string,colname:string): Promise<boolean> {
        let oldCount: any = 0;
        let newCount: any = 0;
        do {
            oldCount = newCount;
            const userList = await this.userListing.locator(`[data-field="${colname}"]`).all();
            newCount = userList.length;
            console.log(newCount);
            if (newCount > 0) {
                await userList[newCount - 1].scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(1000);
            }
        } while (newCount > oldCount);
    
        const updatedUserList = (await this.userListing.locator(`[data-field="${colname}"]`).all());
        for (const user of updatedUserList) {
            const userName = await user.textContent();
            if  (userName && userName.trim().toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
        }
        return false;
    }



  /**
   * Is No Results visible
   * @returns A boolean indicating whether the text "No results" is visible or not
   */
  async isNoResultsVisible(): Promise<boolean> {
    await this.noResultsText.waitFor();
    return await this.noResultsText.isVisible();
  }

  /**
   * Gets description under 'LinkedIn Url' feild
   * @returns A String containing the description displayed under the 'LinkedIn Url' feild
   */
  async getDescriptionUnderLinkedInUrl(): Promise<string> {
    return await this.linkedInUrlDescription.innerText();
  }

  /**
   * Is all system role dispayed in role dropdown
   * @returns isincluded-A Booelan indicating whether the dropdown list displays all the system roles or not
   */
  async isAllSystemRoleDisplayedInRoleDropdown(
    expectedroles: Array<string>
  ): Promise<boolean> {
    await this.roleDropdownOptions.waitFor();
    const actualroles = await this.roleDropdownOptions.allInnerTexts();
    const actualrolesdesiredformat = actualroles.toString().split("\n");
    const isincluded = expectedroles.every((role) =>
      actualrolesdesiredformat.includes(role)
    );
    return isincluded;
  }

  /**
   * Is status active chip visible
   * @returns A Booelan indicating whether status active chip is visible  or not
   */
  async isStatusActiveChipVisible(): Promise<boolean> {
    await this.statusActiveChip.waitFor();
    return await this.statusActiveChip.isVisible();
  }

    /**
     * Is all the status feild and role feild filter applied
     * @param value This is the value that the user searches for (eg.'Active','Disabled','Admin' etc).
     * @param datafield The attribute that the user want to search(status,roleand createdBy).
     * @returns A Booelan indicating whether all the users displayed in the list matches the value in the datafield
     */
    async isAllStausActive(value:string,datafield:string): Promise<boolean> {
        let oldCount = 0;
        let newCount = 0;
        do {
            oldCount = newCount;
            const statusList = await this.userListing.locator(`[data-field="${datafield}"]`).all();
            newCount = statusList.length;
            if (newCount > oldCount) {
                await statusList[newCount - 1].scrollIntoViewIfNeeded();
            }
            await this.page.waitForLoadState('networkidle');
        } while (newCount > oldCount);
        const fullStatusList = await this.userListing.locator(`[data-field="${datafield}"]`).allInnerTexts();
        return fullStatusList.every(status => status.includes(value));
    }

    /**
     * checks if the search-bar gets highlighted on mouse hovering
     * @returns A Booelan indicating whether the searchbar gets highlighted or not
     */
    async isSearchBarHighlighted(): Promise<boolean> {
        await this.searchBar.hover();
        const borderColor = await this.searchBar.evaluate(el => window.getComputedStyle(el).borderColor);
        return borderColor === 'rgb(20, 27, 39)';
    }

    /**
     * Gets the error messages from create user form when mandatory felids are clicked and values are not enterd
     * @returns An array of strings containing all the error messages when the when mandatory felids are clicked and values are not enterd.
     */
    async getErrorMessages(): Promise<Array<string|null>> {
        const fnamemsg=await this.enterFNameMessage.textContent();
        const lnamemsg=await this.enterLNameMessage.textContent();
        const rolemsg=await this.enterRoleMessage.textContent();
        const emailmsg=await this.invalidEmailMessage.textContent();
        return [fnamemsg,lnamemsg,emailmsg,rolemsg];
    }

    /**
     * Clicks on all the mandatory feilds on the create user form and moves away without entring any value
     */
    async clickOnMandatoryFields(): Promise<void> {
        const MandatoryFields:Locator[]=[this.firstNameField,this.lastNameField,this.emailField,this.roleField,this.linkedInFeild];
        for(const feild of MandatoryFields){
            await feild.click();
        }
    }

  /**
   * Clicks on the targeted users three dots button
   */
  async clickOnEditButton(): Promise<void> {
    await this.editDots.first().click();
    await this.page.locator(".MuiMenu-paper").waitFor();
  }

    /**
     * Selects desired option from the edit menu box
     */
    async selectOptionFromEditMenu(option:number): Promise<void> {
        await this.editOptions.nth(option).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Gets all the options from the edit menu box
     */
    async getOptionsFromEditMenu(): Promise<Array<string>> {
      const menuItems = await this.editOptions.allTextContents();
      const menuItemsArray: string[] = menuItems;
      console.log(menuItemsArray);
      return menuItemsArray;

    }

    /**
     * Waits for the text to be visible in the edit form before editing
     */   
    async waitForTextToBeVisible(): Promise<void> {
        await this.page.waitForFunction((selector) => {
            const input = document.querySelector(selector) as HTMLInputElement;
            return input && input.value.trim() !== '';
          },'[name="firstName"]');
    }
    
    /**
     * Edits all the values of the selected user
     * @param firstName The first name of the user to be entered into the form
     * @param lastName The last name of the user to be entered into the form
     * @param email The email id of the user to be entered into the form
     * @param role The specific role to be selected from the dropdown options
     */
    async editUser(firstname:string,lastname:string,email:string,role:string) {
        let values:Array<string>=[firstname,lastname,email,role];
        await this.waitForTextToBeVisible();
        for(let i=1;i<=4;i++){
            if(i===4){
                await this.editFieldBoxes.nth(i).click();
                await this.selectRoleFromDropdown(values[i-1]);
            }else{
            await this.editFieldBoxes.nth(i).clear();
            await this.editFieldBoxes.nth(i).fill(values[i-1]);
            }
        }
    } 

    /**
     * Edits any one of the fields in the Edit box of the users page
     * @param value value The value to be entered into the specified field in the edit form.
     * @param boxnum The specific field to be selected for editing(firstname,lastname,email,role)
     */
    async editOneField(value:string,boxnum:number){
        await this.waitForTextToBeVisible();
        if(boxnum==4){
            await this.editFieldBoxes.nth(boxnum).click();
            await this.selectRoleFromDropdown(value);
        }else if(boxnum>=1 && boxnum<=3){
            await this.editFieldBoxes.nth(boxnum).clear();
            await this.editFieldBoxes.nth(boxnum).fill(value);
        }
        await this.editFieldSaveButton.click();
    }

    /**
     * Clicks on all the mandatory feilds on the create user form and moves away without entring any value
     */
    async clickOnMandatoryEditFields(): Promise<void> {
        await this.waitForTextToBeVisible();
        for (let i = 1; i <=5; i++) {
            await this.editFieldBoxes.nth(i).clear();
        }
    }
    /**
     * Clicks on the Filter icon
     */
    async clickOnFilterButton(): Promise<void> {
        await this.filterIcon.click();
    }

    /**
     * Clicks on the Filter Role feild and select roles
     * @param roles it accepts indefinite number of roles and stores it in an array
     */
    async clickFilterRole(...roles:string[]):Promise<void>{
        await this.filterRoleFeild.click();
        await this.filterRoleFeild.waitFor();
        for (const role of roles) {
            await this.page.getByRole('option', { name: role, exact: true }).click();
            await this.filterRoleFeild.click();
        }
        await this.filterRoleFeild.click();
    }

  /**
   * Clicks on the Filter Apply Button
   */
  async clickOnFilterApplyButton(): Promise<void> {
    await this.filterApplyButton.click();
  }

    /**
     * Clicks on the Filter Reset Button
     */   
    async clickOnFilterResetButton(): Promise<void> {
        await this.filterResetButton.click();
    }

    /**
     * Is all the filter chips removed
     * @returns A boolean value representing whether the filter chip is removed or not
     */
    async isAllFilterChipsRemoved(): Promise<boolean> {
        const filterCount=await this.filterChips.count();
        return filterCount === 0;
    }

    /**
     * Is selected filter chips visible
     * @param chips it accepts indefinite number of roles and stores it in an array
     * @returns A Boolean indicating if the applied filter's chips are visible or not
     */
    async isFilterChipsVisible(...chips:string[]): Promise<boolean> {
        await this.page.locator(`text=${chips[0]}`).waitFor();
          for(const chip of chips){
            const chipsdisplayed= this.page.locator(`text=${chip}`);
            const isChipVisible=await  chipsdisplayed.isVisible();
            if(!isChipVisible) return false;
          }
          return true;
    }

    /**
     * Gets the values from Role field,Status Feild and created By feilds 
     * @param feild It is the field from which the values are to returned(Role,Status,CreatedBy)
     * @param allRoles It is a set that stores the value of the field
     * @returns An array containing non-duplicate valued from the field
     */
    async getFilterValues(feild:string,allRoles=new Set<string>()): Promise<string[]> {
        await this.page.waitForTimeout(1000);
        const filterValues = await this.userListing.locator(`[data-field="${feild}"]`).allInnerTexts();
        filterValues.forEach(value => allRoles.add(value));
        const size=allRoles.size;
        const lastElement=this.userListing.locator(`[data-field="${feild}"]`).last();
        await lastElement.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);
        if(allRoles.size > size){
            this.getFilterValues(feild,allRoles);
        }
        console.log([...allRoles]);
        return [...allRoles]
    }

    /**
     * Clicks and only fill the value in the createdBy field
     * @param value The desired name to be enterd in the createdBy feild   
     */
    async fillFilterCreatedByField(value: string): Promise<void> {
        await this.filterCreatedByField.fill(value);
    }

    /**
     * Clears the value entered in the Filter createdBy feild   
     */    
    async clearFilterCreatedByField(): Promise<void> {
        await this.filterCreatedByField.clear();
    }
    
    /**
     * Gets all  the value from the Filter createdBy feild dropdown 
     * @param value The desired name to be enterd in the createdBy feild
     * @retruns actsuggestions An array containing all the suggestions displayed in the createdBy field 
     */
    async getFilterCreatedByValues(value:string): Promise<string[]> {
        await this.filterCreatedByField.fill(value);
        await this.page.getByRole('option', { name: value }).waitFor()
        const actsuggestions=await this.filterCreateByFieldDropdown.allInnerTexts();
        return actsuggestions;     
    }

    /**
     * Clicks and enters value in the Filter createdBy feild
     * @param value The desired name to be enterd in the createdBy feild
     * @returns A boolean value indicating whether the value is an valid name or not
     */
    async enterCreateFeildValue(value: string): Promise<boolean | undefined> {
        await this.filterCreatedByField.fill(value);
        await this.fillFilterCreatedByField(value);
        const optVisible = await this.page.getByRole('option', { name: value }).waitFor({ timeout: 1000 }).catch(() => { return false });
        if (optVisible == false) { return false } else
            await this.page.getByRole('option', { name: value }).click();
    }

    /**
     * Clicks and selects the Filter status value
     * @param value The desired status to be selected feild
     */
    async clickFilterStatusField(value: string): Promise<void> {
      await this.filterStatusField.click();
      await this.filterStatusDropdown.waitFor();
      await this.page.getByRole('option', { name: value }).click();
    }
    /**
     * Gets the difference of the months 
     * @param targetMonth The desired month to the selected
     * @param actualMonth The month displayed when the calendar is opened
     * @returns A number whose value  is the difference between the months.
     */
    async getMonthDifference(targetMonth:string,actualMonth:string):Promise<number>{
      const months:{[key:string]:number}={
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
          }
          return months[actualMonth]-months[targetMonth]
   }

   /**
    * Selects a specific date for the "Last LogIn" and "Created " filter.
    * @param Month The month to select (e.g., "September").
    * @param date The day of the month to select (e.g., "15"). 
    * @param col The column index of the date picker to interact with (0, 1, 2 or 3).
    */
    async SelectDate(Month:string,date:string,col:number){
      await this.selectDateField.nth(col).click();
      await this.calendar.waitFor();
      const actualMonth=(await this.page.locator(".css-ml5lne").first().innerText()).split(' ')[0].trim();
      let monthDiffNumber= await this.getMonthDifference(Month,actualMonth);
      let navbutton=  monthDiffNumber > 0? 'Previous month':'Next month';
      const clicks=Math.abs(monthDiffNumber);
      for(let i=0;i<clicks;i++){
          await this.page.getByRole('button', {name: navbutton }).click();
      }
      await this.page.getByText(Month).waitFor();
      await this.page.getByLabel(Month).getByRole('gridcell', { name: date , exact: true }).first().click();
      
  }

    /**
     * Applies "Role","Status" and "Created By" Filter
     * @param value The desired status to be selected feild
     */  
    async applyThreeFilters(role:string,createdby:string,status:string): Promise<void> {
      await this.clickFilterRole(role);
      await this.enterCreateFeildValue(createdby);
      await this.clickFilterStatusField(status);
    }

<<<<<<< HEAD
    /**
     * Clicks on Disable Confirmation button 
     */ 
    async clickDisableConfirmation(): Promise<void> {
      await this.disableConfirmationButton.waitFor();
      await this.disableConfirmationButton.click();
    }

    /**
     * Clicks on Enable Confirmation button 
     */
    async clickEnableConfirmation(): Promise<void> {
      await this.popUp.waitFor({state:"visible"});
      await this.enableCofirmationButton.click();
    }

    /**
     * Gets the FirstRow user' Name
     * @returns name The user name of the first row
     */
    async getFirstUserName(): Promise<string> {
        await this.userFirstRowName.waitFor();
        const firstColname = await this.userFirstRowName.allInnerTexts();
        const name=firstColname.toString().trim();
        return name;
    }
    /**
     * Gets the FirstRow user' status
     * @returns status The user status of the first row 
     */
    async getFirstUserStatus(): Promise<string> {
      await this.userFirstRowStatus.waitFor();
      const firstColstatus = await this.userFirstRowStatus.allInnerTexts();
      const status=firstColstatus.toString().trim();
      return status;
    }


=======
>>>>>>> e1e879f3d30e56a3f9ca5c28742a8cbd06ca366c
}