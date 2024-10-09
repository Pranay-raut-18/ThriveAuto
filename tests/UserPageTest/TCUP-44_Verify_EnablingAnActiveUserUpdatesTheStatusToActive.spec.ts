import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_44:UserPage|Verify Enabling  an Active user shows a message and updates the status to "Active"', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    let Fullname: string;
    const status: string = 'Active';


    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
    });

    //Click on the users three dots and select edit option and disable the User
    await test.step(`Click on the users edit button and disable the User`, async () => {
        await userPage.clickOnEditButton();
        await userPage.selectOptionFromEditMenu(2);
    });

    //Click on the Disable confirmation Button
    await test.step(`Click on the Disable confirmation Button`, async () => {
        await userPage.clickDisableConfirmation();
    });    

    //Get the users FullName
    await test.step(`Get the users FullName`, async () => {
        Fullname = await userPage.getFirstUserName();
    });
    
    //Click on the users three dots and select edit option and enable the User
    await test.step(`Click on the users edit button and enable the User`, async () => {
        await userPage.clickOnEditButton();
        await userPage.selectOptionFromEditMenu(0);
    }); 

    //Click on the Enable confirmation Button
    await test.step(`Click on the Enable confirmation Button`, async () => {
        await userPage.clickEnableConfirmation();

    });

    //Verify success message is displayed after enabling user
    await test.step('verify success message is displayed after enabling user', async () => {
        expect.soft(await userPage.getSuccessMessage()).toBeTruthy();//(`${Fullname} successfully reenabled`)
    });

    //Verift the User's status is updated to Active
    await test.step('Verift the Users status is updated to Active', async () => {
        await userPage.popUp.waitFor({state:"hidden"}) 
        expect.soft(await userPage.getFirstUserStatus()).toBe(status);
    });



});