import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import {HomePage} from "../../Pages/HomePage";
import { CustomerPage } from '../../Pages/CustomerPage';
import {Url, EmailAddress, Password } from "../../utils/config-utils"
import exp from 'constants';

test("verifying filter functionality by Customer Type Executive Search Firm TC-07 ",async({page})=>{
    const loginPage = new LoginPage(page);             
    const userPage = new UserPage(page);       
    const homePage = new HomePage(page);       
    const customerPage = new CustomerPage(page);  
    const primaryContact= "Jill Hughes";     

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
      await loginPage.login(Url, EmailAddress, Password); 
       
    });

    //Go to Admin Portal Customer tab
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await page.waitForURL;
        await homePage.clickOnGoToAdminPortal();
    })

    //Click on Customer tab
    await test.step(`Click Customer tab`, async () => {
        await userPage.ClickOnCustomerTab();
    })

    //Remove the Filter "Status Active" by clicking (X) button
    await test.step(`Remove the Filter "Status Active" by clicking (X) button`, async () => {
        await customerPage.removepreFilterStatus();
    })

    //Click on Filter Option (Symbol). 
    await test.step(`Click on Filter Option (Symbol). `, async () => {
        await customerPage.clickonFilterOption();
    })
    
    //Select the Customer type to "Executive Search Firm" 
    await test.step(`Select the Customer type to "Executive Search Firm"`, async () => {
        await customerPage.selectCustomertypeEexcutiveSearchFirm();
    })
    
    //Click On "Apply" Button
    await test.step(`Click On "Apply" Button`, async () => {
        await customerPage.clickOnApplyButton();
    })
    
    //Verify all the records of Customer Type
    await test.step(`Verify all the records of Customer Type`, async () => {
       await expect(await customerPage.VerifyrecordsofCustomerType()).toBe("Executive Search Firm")
    })
    
  })
