
import { Locator, Page, expect } from '@playwright/test';


/**
 * login page
 * @author Pranay
 */
export class LoginPage {
    readonly page: Page;
    private email_AddressInputFeild: Locator;
    private passwordInputField: Locator;
    private ContinueWithEmail: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email_AddressInputFeild = page.locator("#username");
        this.passwordInputField = page.locator('#password');
        this.ContinueWithEmail = page.getByRole('button', { name: 'Continue with email' });
    }

    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Enter Email Address
     */
    async enterEmailAddress(emailAddress: string) {
        await this.email_AddressInputFeild.click();
        await this.email_AddressInputFeild.fill(emailAddress);
    }


    /**
     * Enter Password
     */
    async enterPassword(password: string) {
        await this.passwordInputField.click();
        await this.passwordInputField.fill(password);
    }

    /**
     * Click on 'Continue with Email'
     */
    async clickOnContinueWithEmailButton() {
        await this.ContinueWithEmail.click()
    }
    
    /**
     * Log In
     */
    async login(url: string, email: string, password: string): Promise<void> {
        await this.goTo(url);
        await this.enterEmailAddress(email);
        await this.enterPassword(password);
        await this.clickOnContinueWithEmailButton();
    }

}