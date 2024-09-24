import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url,EmailAddress,Password } from "../../utils/config-utils"


test('TCUP_21:UserPage|Verify that error messages are shown when required fields are left empty while editing.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const Fullname = "Test User577";
  let expErrMsg: (string | null)[] = ["Please enter a first name", "Please enter a last name", "Please enter a valid email", "Please select a role for this user"];
  let actErrMsg: (string | null)[];
  

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

  //Edit and leave all the required fields empty
  await test.step(`Edit and leave all the required fields empty`, async () => {
    await userPage.clickOnMandatoryEditFields();
  });

  //Get the Error messages displayed under each mandatory feilds
  await test.step('Get the Error messages displayed under each mandatory feilds ', async () => {
    actErrMsg = await userPage.getErrorMessages();
  });  

  //Verify error messages are displayed
  await test.step('Verify error messages are displayed', async () => {
    const expErrMsgString = JSON.stringify(expErrMsg);
    const actErrMsgString = JSON.stringify(actErrMsg);
    expect.soft(actErrMsgString).toBe(expErrMsgString);
  });




});