import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_03_UserPage|Verify if the email address format is validated.', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp: string
  timestamp = getCompleteTimestamp();
  const Fname: string = "AutoFname";
  const Lname: string = `AutoLname${timestamp}`;
  const email: string = Lname + "@testcom";
  const reqrole: string = 'Admin';
  const expInvalidmsg: string = "Please enter a valid email";

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

  //Enter FirstName
  await test.step('Enter First Name', async () => {
    await userPage.enterFirstName(Fname);
  });

  //Enter LastName
  await test.step('Enter Last Name', async () => {
    await userPage.enterLastName(Lname);
  });

  //Enter Email
  await test.step('Enter Email', async () => {
    await userPage.enterEmail(email);
    await page.waitForTimeout(1000);
  });

  //Click on roleFeild
  await test.step('Click on roleFeild', async () => {
    await userPage.clickOnRoleButton();

  });

  //Select Role
  await test.step('Select Role', async () => {
    await userPage.clickOnRoleButton();
    await userPage.selectRoleFromDropdown(reqrole);
  });

  //Verify AddandSendInvite Button is disabled
  await test.step('Verify AddandSendInvite Button is disabled', async () => {
    expect.soft(await userPage.isAddAndSendInviteButtonDisabled()).toBe(true);
  });

  //Verify Invalid email format message is shown
  await test.step('Verify Invalid email format message is shown', async () => {
    expect.soft(await userPage.getInvalidEmailMessage()).toBe(expInvalidmsg);
  });

});  