import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils"


test('TCUP_46:UserPage|Verify Resending Invite to  a User with status "Invited" displays sucess message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const value:string='Invited';
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

    //Click on filter icon 
    await test.step(`Click on filter icon`, async () => {
        await userPage.clickOnFilterButton();
    });

    //Click on status Field and select a status
    await test.step(`Click on status Field and select a status`, async () => {
        await userPage.clickFilterStatusField(value);
    });

    //Click on Apply Button
    await test.step(`Click on Apply Button`, async () => {
        await userPage.clickOnFilterApplyButton();
        
    });  

  //Get the users FullName
  await test.step(`Get the users FullName`, async () => {
      Fullname=await userPage.getFirstUserName();
  })


  //Click on the users three dots and select edit option
  await test.step(`Click on the users edit button`, async () => {
    await userPage.clickOnEditButton();
    await userPage.selectOptionFromEditMenu(1);
  });
  
 //Verify that success message is displayed after resending the invite
 await test.step('verify success message is displayed after disabling use', async () => {
    expect.soft(await userPage.getSuccessMessage()).toBe(`${Fullname} successfully reinvited`);
  });

});