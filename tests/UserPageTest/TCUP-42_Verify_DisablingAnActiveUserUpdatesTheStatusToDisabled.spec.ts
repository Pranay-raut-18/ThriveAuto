import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils"


test('TCUP_42:UserPage|Verify Disabling an Active User shows a message and Updates the Status to Disabled', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let Fullname:string ;
  const status:string='Disabled';
  

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Potal 
  await test.step(`Go to Admin Potal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  //Get the users FullName
  await test.step(`Get the users FullName`, async () => {
      Fullname=await userPage.getFirstUserName();
  })


  //Click on the users three dots and select edit option
  await test.step(`Click on the users edit button`, async () => {
    await userPage.clickOnEditButton();
    await userPage.selectOptionFromEditMenu(2);
  });
  
  //Click on the Disable confirmation Button
  await test.step(`Click on the Disable confirmation Button`, async () => {
    await userPage.clickDisableConfirmation();
  });

 //Verify success message is displayed after disabling user
 await test.step('verify success message is displayed after disabling use', async () => {
    expect.soft(await userPage.getSuccessMessage()).toBe(`${Fullname} successfully disabled`);
  });

 //Verift the User's status is updated to Disabled
 await test.step('Verift the Users status is updated to Disabled', async () => {
    expect.soft(await userPage.getFirstUserStatus()).toBe(status);
    })


});