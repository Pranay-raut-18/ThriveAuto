import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_57:UserPage|Verify user is not added to user list after clicking cancel button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    let timestamp: string
    timestamp = getCompleteTimestamp();
    const Fname: string = "Shaun";
    const Lname: string = `Michelles${timestamp}`;
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

    //Clear Preapplied filter
    await test.step('Clear Preapplied filter', async () => {
        await userPage.clearFilter();
    })

    //verify user is not added to the user list
    await test.step('verify user is added not to the user list', async () => {
        await expect.soft(await userPage.getNewlyAddedUserEmail(email)).toBeHidden();
    });

});