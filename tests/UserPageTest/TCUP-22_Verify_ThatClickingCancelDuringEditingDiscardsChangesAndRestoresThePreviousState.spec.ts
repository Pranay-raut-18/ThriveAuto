import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils"


test('TCUP_22:UserPage|Verify that clicking "Cancel" during editing discards changes and restores the previous state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp=getCompleteTimestamp();
  const email=`edited${timestamp}@test.com`;
  const Fullname = "AutoFname";
  let credbeforeediting : (string | null)[];
  let credafterediting: (string | null)[];

 

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

  //Get the crdentials of the user before editing 
  await test.step('Get the crdentials of the user before editing', async () => {
    credbeforeediting =  await userPage.getNewUserCredentialsFromUserList();
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
  
  //Click on Cancel Button
  await test.step('Click on Cancel Button', async () => {
    await userPage.clickOnCancelButton();
    });

   //Get the crdentials of the user after editing 
    await test.step('Get the crdentials of the user before editing', async () => {
        credafterediting =  await userPage.getNewUserCredentialsFromUserList();
     });  
   
//Verify the users credentials after clicking the cancel button
  await test.step('Verify Credentials after clicking the cancel button', async () => {
    const userCredString = JSON.stringify(credbeforeediting);
    const listcredString = JSON.stringify(credafterediting);
    expect.soft(listcredString).toBe(userCredString);
  });


});      