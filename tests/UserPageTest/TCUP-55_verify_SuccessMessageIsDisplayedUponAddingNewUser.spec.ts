import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_55:UserPage|Verify that a success message is displayed upon adding a new user.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp: string
  timestamp = getCompleteTimestamp();
  const Fname: string = "AutoFname";
  const Lname: string = `AutoLname${timestamp}`;
  const email: string = Lname + "@test.com";
  const reqrole: string = 'Admin';
  const expsucessmessage: string = `${Fname} ${Lname} successfully invited`;

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

  //Click on Adduser icon
  await test.step(`Click on Adduser icon`, async () => {
    await userPage.clickOnAddUserIcon();
  });

  //Enter all the feilds of AddUser Table
  await test.step(`Enter all the feilds of AddUser Table`, async () => {
    await userPage.enterAllFields(Fname, Lname, email, reqrole);
  });

  //Click on AddandSendInvite Button
  await test.step('Click on AddandSendInvite Button', async () => {
    await userPage.clickAddButton();
  });

  //verify success message is shown after adding user
  await test.step('Verify sucess message is shown after adding user', async () => {
    expect.soft(await userPage.getSuccessMessage()).toBe(expsucessmessage);
  });

});