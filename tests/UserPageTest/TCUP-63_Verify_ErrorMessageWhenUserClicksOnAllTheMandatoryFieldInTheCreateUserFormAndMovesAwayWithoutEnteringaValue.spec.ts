import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_63:UserPage|Verify error message when user clicks on all the Mandatory field in the Create User form and moves away without entering a value', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    
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


    //Click on Adduser icon
    await test.step(`Click on Adduser icon`, async () => {
        await userPage.clickOnAddUserIcon();
    });

    //Click on all Mandatory feilds and move away without entering any value
    await test.step(`Click on all Mnadatory feilds and movw away without entering`, async () => {
        await userPage.clickOnMandatoryFields();
    })

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