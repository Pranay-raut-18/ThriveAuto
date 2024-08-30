
import { Locator, Page, expect } from '@playwright/test';


/**
 * User page
 * @author Akhil
 */
export class UserPage {
    readonly page: Page;
    private custometrTabButton: Locator;
    private addusericon:Locator;
    private statusdisablebutton: Locator;
    private filtericon:Locator;
    private searchbox:Locator;
    private filterResetButton:Locator;
    private filterApplyButton:Locator;
    private firstnameFeild:Locator;
    private lastnameFeild:Locator;
    private emailFeild:Locator;
    private roleFeild:Locator;
    private roleDropdownOptions:Locator;
    private addButton:Locator;
    private successmessage:Locator;
    private userlisting:Locator;
    
    


    constructor(page: Page) {
        this.page = page;
        this.custometrTabButton = page.locator('p', { hasText: 'Customers' });
       this.addusericon=page.locator("button:text('User')");
       this.statusdisablebutton = page.locator("//div[@class='MuiButtonBase-root MuiChip-root MuiChip-filled MuiChip-sizeSmall MuiChip-colorDefault MuiChip-deletable MuiChip-deletableColorDefault MuiChip-filledDefault css-7lzqhs']//*[name()='svg']");
        this.filtericon=page.locator(".MuiBadge-root");
        this.filterResetButton=page.locator("text='Reset'");
        this.filterApplyButton=page.locator("text='Reset'");
        this.searchbox=page.locator("input[placeholder='Search users']");
        this.firstnameFeild=page.locator("[name='firstName']");
        this.lastnameFeild=page.locator("[name='lastName']");
        this.emailFeild=page.locator("[name='email']");
        this.roleFeild=page.locator("[role='combobox']");
        this.roleDropdownOptions=page.getByRole('listbox' ,{name:'Role'});
        this.addButton=page.locator("text='Add and Send Invite'");
        this.successmessage=page.locator("//div[@class='MuiAlert-message css-1xsto0d']");
        this.userlisting=page.locator("div.MuiDataGrid-main");
    }


    /**
     * Click On Customer Tab
     */
    async ClickOnCustomerTab() 
    {
        await this.custometrTabButton.click()
    }

    /**
     * Clear pre applied filter
     */
    async ClearFilter(){
        await this.statusdisablebutton.click();
        await this.page.waitForTimeout(2000);
        
    }
    
    /**
     * Click on Add UserIcon
     */
    async clickOnAddUserIcon(){
        await this.addusericon.waitFor();
        await this.addusericon.click();
    }
    
    /**
     * Enter First Name
     */
    async enterFirstName(Fname:string){
        await this.firstnameFeild.fill(Fname);

    }

    /**
     * Enter Last Name
     */
    async enterLastName(Lname:string){
        await this.lastnameFeild.fill(Lname);

    }

    /**
     * Enter email
     */
    async enterEmail(emai:string){
        await this.emailFeild.fill(emai);
    }

        

     /**
     * Click on Role button
     */
    async clickOnRoleButton(){
        await this.roleFeild.click();
        await this.page.waitForTimeout(2000);

    }

    /**
     * Select  Role from Dropdown
     */
    async selectRoleFromDropdown(reqrole:string){
        await this.roleDropdownOptions.waitFor();
        const desiredOption =this.roleDropdownOptions.getByRole('option', { name:reqrole, exact: true });
        await desiredOption.click();
       
    }


    /**
     * Click on Add and Send Invite
     */  
    async clickAddbutton(){
        await this.addButton.click();
        await this.page.waitForTimeout(2000);
    }  

    /**
     * Get Sucess Message
     */  
    async getSucessMeessage(){
        return await this.successmessage.textContent();
        
    }

    /**
     * check userlist for the newly added user
     */     
    async checkUser(email: string) {
        const userlist = this.userlisting;
        const emailLocator = userlist.locator(`text="${email}"`);
        return emailLocator;
    }
}