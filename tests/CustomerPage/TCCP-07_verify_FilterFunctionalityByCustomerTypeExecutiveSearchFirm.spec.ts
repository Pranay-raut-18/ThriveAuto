import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import {HomePage} from "../../Pages/HomePage";
import { CustomerPage } from '../../Pages/CustomerPage';
import {Url, EmailAddress, Password } from "../../utils/config-utils"

test("TCCP_07:CustomerPage | verify filter functionality by Customer Type Executive Search Firm",async({page})=>{
    const loginPage = new LoginPage(page);             
    const userPage = new UserPage(page);       
    const homePage = new HomePage(page);       
    const customerPage = new CustomerPage(page);  
    const customerType = "Executive Search Firm";  
    

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
      await loginPage.login(Url, EmailAddress, Password); 
       
    });

    //Go to Admin Portal
    await test.step(`Go to Admin Portal`, async () => {
        await page.waitForURL;
        await homePage.clickOnGoToAdminPortal();
    })

    //Click on Customer tab
    await test.step(`Click Customer tab`, async () => {
        await userPage.clickOnCustomerTab();
    })

    //Remove the Filter "Status Active" by clicking (X) button
    await test.step(`Remove the Filter "Status Active" by clicking (X) button`, async () => {
        await customerPage.removePreFilterStatus();
    })

    //Click on Filter Option (Symbol). 
    await test.step(`Click on Filter Option (Symbol). `, async () => {
        await customerPage.clickOnFilterOption();
    })
    
    //Select the Customer type to "Executive Search Firm" 
    await test.step(`Select the Customer type to "Executive Search Firm"`, async () => {
        await customerPage.selectCustomerTypeFromDropdown(customerType);
    })
    
    //Click On "Apply" Button
    await test.step(`Click On "Apply" Button`, async () => {
        await customerPage.clickOnApplyButton();
    })
    
    //Verify all the records of Customer Type
    await test.step(`Verify all the records of Customer Type`, async () => {
       await expect(await customerPage.isCustomerTypeVisible(customerType)).toBeVisible();
    })
    
  })