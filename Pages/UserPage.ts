
import { Locator, Page, expect } from '@playwright/test';


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
    private filterIcon: Locator;
    private filterResetButton: Locator;
    private filterApplyButton: Locator;
    private firstNameField: Locator;
    private lastNameField: Locator;
    private emailField: Locator;
    private roleField: Locator;
    private roleDropdownOptions: Locator;
    private addAndSendInviteButton: Locator;
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

    constructor(page: Page) {
        this.page = page;
        this.customerTabButton = page.locator('p', { hasText: 'Customers' });
        this.addUserIcon = page.locator("button:text('User')");
        this.addUserForm = page.locator("div.MuiPaper-elevation16");
        this.statusDisableButton = page.locator("//div[@class='MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorDefault MuiChip-deletable MuiChip-deletableColorDefault MuiChip-filledDefault css-7lzqhs']//*[name()='svg']");
        this.filterIcon = page.locator(".MuiBadge-root");
        this.filterResetButton = page.locator("text='Reset'");
        this.filterApplyButton = page.locator("text='Apply'");
        this.searchBox = page.locator("[placeholder='Search by name or email']");
        this.firstNameField = page.locator("[name='firstName']");
        this.lastNameField = page.locator("[name='lastName']");
        this.emailField = page.locator("[name='email']");
        this.roleField = page.locator("[role='combobox']");
        this.roleDropdownOptions = page.getByRole('listbox', { name: 'Role' });
        this.addAndSendInviteButton = page.locator("text='Add and Send Invite'");
        this.successMessage = page.locator("//div[@class='MuiAlert-message css-1xsto0d']");
        this.userListing = page.locator("div.MuiDataGrid-virtualScroller");
        this.invalidEmailMessage = page.locator("text='Please enter a valid email'");
        this.uniqueEmailMessage = page.locator("text='must be unique'");
        this.duplicateEmail = page.locator("div.MuiBox-root  a").first();
        this.userFirstRow = page.locator('[data-rowindex="0"]');
        this.userFirstRowName = page.locator('[data-rowindex="0"] p').nth(0);
        this.userFirstRowCreatedDate = page.locator('[data-rowindex="0"] p').nth(1);
        this.userFirstRowStatus = page.locator('[data-rowindex="0"] p').nth(2);
        this.userFirstRowEmail = page.locator('[data-rowindex="0"] a');
        this.userFirstRowRole = page.locator('[data-rowindex="0"] div [title="Admin"]');
        this.cancelButton = page.locator("text='Cancel'");
        this.noResultsText = page.locator("text='No results'");
        this.linkedInUrlDescription = page.getByText('Entering a LinkedIn URL');
        this.statusActiveChip=page.locator(" text='Status: Active'");

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
        const desiredOption = this.roleDropdownOptions.getByRole('option', { name: role, exact: true });
        await desiredOption.click();
    }

    /**
     * Gets all the Roles from Dropdown
     * @returns An array containg all the roles displayed in roles drop-down.
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
    async enterAllFields(firstName: string, lastName: string, email: string, role: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.roleField.click();
        await this.roleDropdownOptions.waitFor();
        const desiredOption = this.roleDropdownOptions.getByRole('option', { name: role, exact: true });
        await desiredOption.click();
    }

    /**
     * Clicks on Add and Send Invite
     */
    async clickAddButton() {
        await this.addAndSendInviteButton.click();
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
     * @returns The locator pointing to the email of the newly added user.
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
        return await this.addAndSendInviteButton.isDisabled();
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
        await this.userListing.waitFor();
    }

    /**
     * Is searched attribute(name and email) displayed in user list
     * @param value The name or email being searched for in the user list
     * @returns A boolean value indicating whether the searched attribute is displayed in user list or not.
     */
    async isSearchedAttributeDisplayedInUserList(value: string): Promise<boolean> {
        let oldCount: any = 0;
        let newCount: any = 0;
        do {
            oldCount = newCount;
            const userList = await this.userListing.locator('[data-field="name"]').all();   
            newCount = userList.length;
            if (newCount > 0) {
                await userList[newCount - 1].scrollIntoViewIfNeeded();
                await this.page.waitForTimeout(1000);
            }
        } while (newCount > oldCount);
        const updatedUserList = (await this.userListing.locator('[data-field="name"]').all()).slice(1);
        for (const user of updatedUserList) {
            const userName = await user.textContent();
            if (userName?.trim().toLowerCase() && !userName.trim().toLowerCase().includes(value.toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    /**
     * Is No Results visible
     * @returns A boolean indicating whether the text "No results" is visible or not
     */
    async isNoResultsVisible(): Promise<boolean> {
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
     * @returns A Booelan indicating whether the dropdown list displays all the system roles or not
     */
    async isAllSystemRoleDisplayedInRoleDropdown(expectedroles: Array<string>): Promise<boolean> {
        await this.roleDropdownOptions.waitFor();
        const actualroles = await this.roleDropdownOptions.allInnerTexts();
        const actualrolesdesiredformat = actualroles.toString().split('\n');
        const isincluded = expectedroles.every(role => actualrolesdesiredformat.includes(role));
        return isincluded;
    }

    /**
     * Is status active chip visible
     * @returns A Booelan indicating whether status active chip is visible  or not
     */
    async isStatusActiveChipVisible(): Promise<boolean> {
        return await this.statusActiveChip.isVisible();
    }


}