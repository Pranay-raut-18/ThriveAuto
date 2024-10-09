import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils"


test('TCUP_47:UserPage|Verify "Resend Invite" option is not available for  User with status "Active"', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let Fullname:string ;
  let buttons:string[];
 
  

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Potal 
  await test.step(`Go to Admin Potal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  //Click on the users three dots
  await test.step(`Click on the users edit button`, async () => {
    await userPage.clickOnEditButton();
  });

  //Get all the names of the available button
  await test.step(`Get all the names of the available button`, async () => {
     buttons = await userPage.getOptionsFromEditMenu();
  });
  
 //Verify that "Resend Invite" Button is not available to the user
 await test.step(`Verify that "Resend Invite" Button is not visible`, async () =>{
       const buttonVisible= buttons.includes('Resend Invite');
       expect(buttonVisible).toBe(false);
 });
 

});