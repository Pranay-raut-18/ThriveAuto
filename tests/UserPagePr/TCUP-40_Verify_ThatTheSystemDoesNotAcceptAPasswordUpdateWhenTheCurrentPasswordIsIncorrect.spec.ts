import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { UserPagePr } from '../../Pages/UserPagePr';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_40:UserPage | Verify that the system does not accept a password update when the current password is incorrect.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const userPagepr = new UserPagePr(page);

    const currentPassword= "Changeme10$";
    const newPassword= "Changeme2$";
    const confrimPassword= "Changeme2$";

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
    
    //Click on the "Account" icon.
    await test.step(`Click on the "Account" icon.`, async () => {
        await userPagepr.clickOnAccountButton();
    });

    // From the dropdown menu, select "My Account."
    await test.step(`From the dropdown menu, select "My Account."`, async () => {
        await userPagepr.clickOnMyAccountOption();
    });

    // Click on the "Password and Security" option.
    await test.step(`Click on the "Password and Security" option.`, async () => {
        await userPagepr.clickOnPasswordsAndSecurityOption();
    });

    // Click on the "Update Password" button.
    await test.step(`Click on the "Update Password" button.`, async () => {
        await userPagepr.clickOnUpdatePasswordButton();
    });
    
    // Enter an incorrect current password.
    await test.step(`Enter an incorrect current password.`, async () => {
        await userPagepr.enterCurrentPassword(currentPassword);
    });
    
    // Enter a new password that does not meets all the specified requirements
    await test.step(`Enter a new password that does not meets all the specified requirements`, async () => {
        await userPagepr.enterNewPassword(newPassword );
    });
    
    // Enter a different password in the confirm password box.
    await test.step(`Enter a different password in the confirm password box.`, async () => {
        await userPagepr.enterConfrimNewPassword(confrimPassword );
    });
    
    // Click on the "Save" button.
    await test.step(`Click on the "Save" button.`, async () => {
        await userPagepr.clickOnSaveButton();
    });
    
    // Verify that the Password is not Updated
    await test.step(`Verify that the Password is not Updated`, async () => {
        await expect(page.locator(".css-1r0w6qt").nth(0)).toHaveText("is invalid");  
    });

});    