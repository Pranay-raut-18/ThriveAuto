import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import {HomePage} from "../../Pages/HomePage";
import { CustomerPage } from '../../Pages/CustomerPage';
import {Url, EmailAddress, Password } from "../../utils/config-utils"

test("Verifying search functionality by Primary Contact 06",async({page})=>{
    const loginPage = new LoginPage(page);             
    const userPage = new UserPage(page);       
    const homePage = new HomePage(page);       
    const customerPage = new CustomerPage(page);  
    const primaryContact= "Jill Hughes";     

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
      await loginPage.login(Url, EmailAddress, Password);    
    });

    //Verify user is logged in successfully
    await test.step(`Verify user is logged in successfully`, async () => {
      homePage.clickOnOpenAccountMenu();
      await expect(await page.getByText('Log Out')).toHaveText("Log Out");
      await page.locator('#account-menu > .MuiBackdrop-root').click();
      await page.waitForSelector("//p[@class='MuiTypography-root MuiTypography-body1 MuiTypography-noWrap MuiListItemText-primary css-gnfns7']")
    })

    //Go to Admin Portal Customer tab
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await page.waitForURL;
        await homePage.clickOnGoToAdminPortal();
    })

    //Click on Customer tab
    await test.step(`Click Customer tab`, async () => {
        await userPage.ClickOnCustomerTab();
    })

    //Click on Search field.
    await test.step(`Click on Search field.`, async () => {
        await customerPage.ClickOnSearchFeild();
    })

    //Enter Primary Contact
    await test.step(`Enter Primary Contact`, async () => {
        await customerPage.enterName(primaryContact);
        await page.waitForSelector(".css-opb0c2");
    })

    //verifying that Primary Contact is visible in the table
    await test.step(`verifying that Primary Contact is visible in the table`, async () => {
        await expect(await customerPage.verifyPrimaryContactisVisible(primaryContact)).toBeVisible();
    })
    
  })
