import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_05:UserPage|Verify Newly Added User Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  let timestamp: string
  timestamp = getCompleteTimestamp();
  const Fname: string = "AutoFname";
  const Lname: string = `AutoLname${timestamp}`;
  const Fullname: string = `${Fname} ${Lname}`;
  const email: string = Lname + "@test.com";
  const reqrole: string = 'Admin';
  let userCred: (string | null)[] = [Fullname, email, reqrole];
  let listcred: (string | null)[];


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

  //Enter all the feilds of AddUser Table
  await test.step(`Enter all the feilds of AddUser Table`, async () => {
    await userPage.enterAllFields(Fname, Lname, email, reqrole);
  })


  //Click on AddandSendInvite Button
  await test.step('Click on AddandSendInvite Button', async () => {
    await userPage.clickAddButton();

  });

  //Clear preapplied filter
  await test.step(`Clear preapplied filter`, async () => {
    await userPage.clearFilter();
    //await page.waitForTimeout(2000);

  });

  //Get the crdentials of the newly added user from the UserList
  await test.step('Get the crdentials of the newly added user from the UserList', async () => {
    listcred =  await userPage.getNewUserCredentialsFromUserList();
  });

  //Verify Credentials of the newly added user
  await test.step('Verify Credentials of the newly added user', async () => {
    const userCredString = JSON.stringify(userCred);
    const listcredString = JSON.stringify(listcred);
    expect.soft(listcredString).toBe(userCredString);
  });

});    