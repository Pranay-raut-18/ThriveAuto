import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { UserPagePr } from '../../Pages/UserPagePr';
import { HomePage } from "../../Pages/HomePage";


test.skip('TCUP_37:UserPage | Verify that a user can successfully update their password when all requirements are met.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const userPagepr = new UserPagePr(page);

    const Url= "https://thrive.thrive-dev.com/login";
    const EmailAddress= "qatesting+auto-user@thrivetrm.com";
    const currentPassword= "Mail@123";
    const newPassword= "Changeme2$";
    const confrimPassword= "Changeme2$";

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, currentPassword);
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
        await userPagepr.clickOnPasswordsAndSecurityOptionDEV();
    });

    // Click on the "Update Password" button.
    await test.step(`Click on the "Update Password" button.`, async () => {
        await userPagepr.clickOnUpdatePasswordButton();
    });
    
    // Enter a valid current password.
    await test.step(`Enter a valid current password.`, async () => {
        await userPagepr.enterCurrentPassword(currentPassword);
    });
    
    // Enter a new password that meets all the specified requirements
    await test.step(`Enter a new password that meets all the specified requirements`, async () => {
        await userPagepr.enterNewPassword(newPassword );
    });
    
    // Enter the same new password in the confirm password box.
    await test.step(`Enter the same new password in the confirm password box.`, async () => {
        await userPagepr.enterConfrimNewPassword(confrimPassword);
    });
    
    // Click on the "Save" button.
    await test.step(`Click on the "Save" button.`, async () => {
        await expect(page.getByRole("button",{name:"Save"})).toBeEnabled();
        await userPagepr.clickOnSaveButton();
    });
    
    // Verify that the Password has been changed
    await test.step(`Verify that the Password has been changed.`, async () => {
        await expect(page.locator(".MuiAlert-message")).toHaveText(
            `The password is successfully updated`
          );
    });

});    