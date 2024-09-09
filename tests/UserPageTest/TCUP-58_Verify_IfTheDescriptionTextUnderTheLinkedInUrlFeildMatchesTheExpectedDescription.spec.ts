import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_58:UserPage|Verify if the description text under the "LinkedIn URL" field in the "Add User" form matches the expected description ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    let expdesc: string="Entering a LinkedIn URL allows us to pre-populate the user’s profile information if available."



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
    
    //Verify if the decription under the 'LinkedIn Url' matches the expected description
    await test.step(`Verify if the decription under the "LinkedIn Url" matches the expected description`,async()=>{
        expect.soft(await userPage.getDescriptionUnderLinkedInUrl()).toBe(expdesc);
    });

});