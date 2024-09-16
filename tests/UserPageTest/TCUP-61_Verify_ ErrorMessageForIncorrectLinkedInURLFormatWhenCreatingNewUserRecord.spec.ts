import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_61:UserPage|Verify Error Message for Incorrect LinkedIn URL Format When Creating New User Record ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp: string
  timestamp = getCompleteTimestamp();
  const Fname: string = `AutoFname${timestamp}`;
  const LinkedinUrl:string=Fname+"url";
  const expErrorMsg:string="Please enter the LinkedIn URL in this format: https://linkedin.com/in/<unique identifier>";  


  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Potal 
  await test.step(`Go to Admin Potal Customer tab`, async () => {
    await homePage.clickOnGoToAdminPortal();

  });

  //Click on Adduser icon
  await test.step(`Click on Adduser icon`, async () => {
    await userPage.clickOnAddUserIcon();
  });

  //Enter FirststName
  await test.step('Enter First Name', async () => {
    await userPage.enterFirstName(Fname);
  });

  //Enter an invalid LinkedIn URL format
  await test.step('Enter an invalid LinkedIn URL format', async () => {
    await userPage.enterLinkedInUrl(LinkedinUrl);
    await userPage.clickOnRoleButton();
  });

  //Verify that an valid error message is displayed under the LinkedIn URL feild
  await test.step('Verify that an valid error message is displayed under the LinkedIn URL feild',async()=>{
    expect.soft(await userPage.getLinkedInUrlErrorMessage()).toContain(expErrorMsg);
  });

});