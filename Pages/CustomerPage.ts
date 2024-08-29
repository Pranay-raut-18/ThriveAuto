
import { Locator, Page, expect } from '@playwright/test';


/**
 * Customer page
 * @author Pranay
 */
export class CustomerPage {
    readonly page: Page;
    private custometTabButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.custometTabButton = page.locator('p', { hasText: 'Customers' });
    }


    /**
     * Click On Customer Tab
     */
    async ClickOnCustomerTab() 
    {
        await this.custometTabButton.click()
    }
    
}