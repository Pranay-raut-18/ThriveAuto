import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_02:UserPage|verify "Add and Send Invite" button is disabled when mandatory fields are not filled.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp: string
  timestamp = getCompleteTimestamp();
  const Lname: string = `User${timestamp}`;
  const email: string = Lname + "@test.com";
  const reqrole: string = 'Admin';


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

  //Enter LastName
  await test.step('Enter Last Name', async () => {
    await userPage.enterLastName(Lname);
  });

  //Enter Email
  await test.step('Enter Email', async () => {
    await userPage.enterEmail(email);
  });

  //Click on roleFeild
  await test.step('Click on roleFeild', async () => {
    await userPage.clickOnRoleButton();
  });

  //Select Role
  await test.step('Select Role', async () => {
    await userPage.selectRoleFromDropdown(reqrole);
  });

  //Verify AddandSendInvite Button is disabled
  await test.step('Verify AddandSendInvite Button is disabled', async () => {
    expect.soft(await userPage.isAddAndSendInviteButtonDisabled()).toBe(true);
  });

});