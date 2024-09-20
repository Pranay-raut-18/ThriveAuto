import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_06:UserPage|Verify "Cancel" Button Functionality During User Addition', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    let timestamp: string
    timestamp = getCompleteTimestamp();
    const Fname: string = "Test";
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


    //Enter all the feilds of AddUser Table
    await test.step(`Enter all the feilds of AddUser Table`, async () => {
        await userPage.enterAllFields(Fname, Lname, email, reqrole);
    });

    //Click on Cancel Button
    await test.step('Click on Cancel Button', async () => {
        await userPage.clickOnCancelButton();
    });

    //Verify create user form is closed
    await test.step('Verify create user form is closed', async () => {
        await userPage.addUserForm.waitFor({ state: 'hidden' });
        expect(await userPage.isAddUserFormVisible()).toBeFalsy();
    });
    

});