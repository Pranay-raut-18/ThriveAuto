import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils"


test('TCUP_23:UserPage|Verify that the system validates the email format during the edit operation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp=getCompleteTimestamp();
  const email=`edited${timestamp}@testcom`;
  const Fullname = "AutoFname";
  const expInvalidmsg="Please enter a valid email";
 

 

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Potal 
  await test.step(`Go to Admin Potal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  //Clear preapplied filter
  await test.step(`Clear preapplied filter`, async () => {
    await userPage.clearFilter();

  });

  //Search for the user to be edited by name
  await test.step(`Search by name`, async () => {
    await userPage.enterNameInSearchField(Fullname);
    await page.waitForTimeout(1000);
  });

  //Click on the users three dots and select edit option
  await test.step(`Click on the users edit button`, async () => {
    await userPage.clickOnEditButton();
    await userPage.selectOptionFromEditMenu(0);
  });

  //Edit all the feilds in the edit form
  await test.step(`Edit all the fields in the edit form`, async () => {
    await userPage.editUser("auto","user7034",email,"Hiring Manager");
  });
  
  //Verify Invalid email format message is shown
  await test.step('Verify Invalid email format message is shown', async () => {
    expect.soft(await userPage.getInvalidEmailMessage()).toBe(expInvalidmsg);
  });  
   


});      