import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import {HomePage} from "../../Pages/HomePage";
import { CustomerPage } from '../../Pages/CustomerPage';
import {Url, EmailAddress, Password } from "../../utils/config-utils"

test("TCCP_08:CustomerPage | verify filter functionality by Customer Type 'Enterprise'",async({page})=>{
    const loginPage = new LoginPage(page);             
    const homePage = new HomePage(page);       
    const userPage = new UserPage(page);       
    const customerPage = new CustomerPage(page);  
    const customerType = "Enterprise";  

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
      await loginPage.login(Url, EmailAddress, Password); 
       
    });

    //Go to Admin Portal
    await test.step(`Go to Admin Portal`, async () => {
        page.waitForURL;
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
    
    //Select the Customer type to "Enterprise" 
    await test.step(`Select the Customer type to "Enterprise"`, async () => {
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
