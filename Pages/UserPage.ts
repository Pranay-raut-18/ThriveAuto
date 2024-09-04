
import { Locator, Page, expect } from '@playwright/test';


/**
 * User page
 * @author Akhil
 */

export class UserPage {
    readonly page: Page;
    private customerTabButton: Locator;
    private addUserIcon: Locator;
    private addUserForm: Locator;
    private statusDisableButton: Locator;
    private filterIcon: Locator;
    private searchBox: Locator;
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
    }

    /**
     * Click On Customer Tab
     */
    async clickOnCustomerTab() {
        await this.customerTabButton.click();
    }

    /**
     * Clear pre-applied filter
     */
    async clearFilter() {
        await this.statusDisableButton.click();
        await this.page.waitForTimeout(2000);
    }

    /**
     * Click on Add User Icon
     */
    async clickOnAddUserIcon() {
        await this.addUserIcon.waitFor();
        await this.addUserIcon.click();
    }

    /**
     * Is Add User Form Visible
     */
    async isAddUserFormVisible(): Promise<boolean> {
        return await this.addUserForm.isVisible();
    }

    /**
     * Enter First Name
     */
    async enterFirstName(firstName: string) {
        await this.firstNameField.fill(firstName);
    }

    /**
     * Enter Last Name
     */
    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    /**
     * Enter email
     */
    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    /**
     * Click on Role button
     */
    async clickOnRoleButton() {
        await this.roleField.click();
    }

    /**
     * Select Role from Dropdown
     */
    async selectRoleFromDropdown(role: string) {
        await this.roleDropdownOptions.waitFor();
        const desiredOption = this.roleDropdownOptions.getByRole('option', { name: role, exact: true });
        await desiredOption.click();
    }

    /**
     * Enter all the fields of Add User form
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
     * Click on Add and Send Invite
     */
    async clickAddButton() {
        await this.addAndSendInviteButton.click();
    }

    /**
     * Get Success Message
     */
    async getSuccessMessage() {
        await this.successMessage.waitFor();
        return await this.successMessage.textContent();
    }

    /**
     * Get newly added user's email
     */
    async getNewlyAddedUserEmail(email: string) {
        const emailLocator = this.userListing.locator(`text="${email}"`);
        return emailLocator;
    }

    /**
     * Is Add and Send Invite Button disabled
     */
    async isAddAndSendInviteButtonDisabled(): Promise<boolean> {
        return await this.addAndSendInviteButton.isDisabled();
    }

    /**
     * Get Invalid Email Format message
     */
    async getInvalidEmailMessage() {
        return await this.invalidEmailMessage.textContent();
    }

    /**
     * Get existing email from user list
     */
    async getExistingEmail() {
        return await this.duplicateEmail.textContent();
    }

    /**
     * Get Unique Email message
     */
    async getUniqueEmailMessage() {
        return await this.uniqueEmailMessage.textContent();
    }

    /**
     * Get Newly Added user Credentials from user list
     */
    async getNewUserCredentialsFromUserList() {
        const name = await this.userFirstRowName.textContent();
        const email = await this.userFirstRowEmail.textContent();
        const role = await this.userFirstRowRole.textContent();
        return [name, email, role];
    }

    /**
     * Click on Cancel Button
     */
    async clickOnCancelButton() {
        await this.cancelButton.click();
    }

    /**
     * Enter Name in the search field
     */
    async enterNameInSearchField(name: string) {
        await this.searchBox.fill(name);
        await this.userListing.waitFor();
    }

    /**
     * Is searched name displayed in user list
     */
    async isSearchedAttributeDisplayedInUserList(name: string) {
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

        const updatedUserList = await this.userListing.locator('[data-field="name"]').all();
        for (const user of updatedUserList) {
            const userName = await user.textContent();
            if (userName?.trim().toLowerCase() && !userName.trim().toLowerCase().includes(name.toLowerCase())) {
                return false;
            }
        }
        return true;
    }

    /**
     * Is No Results visible
     */
    async isNoResultsVisible(): Promise<boolean> {
        return await this.noResultsText.isVisible();
    }
}