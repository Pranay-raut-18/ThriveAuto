import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils"


test('TCUP_19:UserPage|Verify that user can successfully edit all fields and success message is displayed', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp=getCompleteTimestamp();
  const email=`edited${timestamp}@test.com`;
  const Fullname = "Test User577"
  const expsucessmessage="auto user7034 updated successfully"

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
    
  })

  //Edit all the feilds in the edit form
  await test.step(`Edit all the fields in the edit form`, async () => {
    await userPage.editUser("auto","user7034",email,"Hiring Manager");
    await userPage.clickAddButton();
  })

 //verify success message is shown after adding user
 await test.step('Verify sucess message is shown after adding user', async () => {
    expect.soft(await userPage.getSuccessMessage()).toBe(expsucessmessage);
  });

});      