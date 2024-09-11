import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_59:UserPage| Verify that the system-generated roles are listed for selection under the "Role" drop-down field in the "Create User" form.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    let expectedroles:Array<string>=["Admin","Candidate","Engagement Coordinator","Hiring Manager","Investment Company","New API Role","Partner","Recruiter","Researcher","Super Admin","Talent Leader","Talent Specialist"];



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

    //Click on Role Field
    await test.step(`Click on Role Field`, async () => {
        await userPage.clickOnRoleButton();
    });
    
    //Verify that all the system generated roles are present in the drop-down
    await test.step(`Verify that all the system generated roles are present in the drop-down`, async()=>{
         expect.soft(await userPage.isAllSystemRoleDisplayedInRoleDropdown(expectedroles)).toBeTruthy();
    });
});