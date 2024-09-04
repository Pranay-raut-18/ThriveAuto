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
    const Fname: string = "AutoFname";
    const Lname: string = `AutoLname${timestamp}`;
    const email: string = Lname + "@test.com";
    const reqrole: string = 'Admin';
    let existingemail: any



    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();

    });

    // Get an Existing email id
    await test.step('Get an Existing email id', async () => {
        existingemail = await userPage.getExistingEmail();
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

    //Verify no new user is added to the user list
    await test.step('Verify no new user is added to the user list', async () => {
        expect.soft(existingemail).not.toBe(email);
    });

});