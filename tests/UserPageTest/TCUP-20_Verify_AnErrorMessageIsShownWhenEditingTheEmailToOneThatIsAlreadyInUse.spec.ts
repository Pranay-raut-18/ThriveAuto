import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils"


test('TCUP_20:UserPage|Verify an error message is shown when editing the email to one that is already in use.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const Fullname = "AutoFname"
  const email="AutoLname@test.com"
  const experrormessage="must be unique"

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

  //Edit only  the email feild in the edit form
  await test.step(`Edit only  the email feild in the edit form`, async () =>{
    await userPage.editOneField(email,3);
  });

  //Verify Unique Email required message is visible after clicking add button
  await test.step('Verify Unique Email required message is visible after clicking add button', async() =>{
    expect.soft(await (userPage.getUniqueEmailMessage())).toBe(experrormessage);
  });
 

});