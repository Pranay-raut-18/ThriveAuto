import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_27:UserPage|Verify  Filter functionality  by applying  "Created By" filter', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const chip1="Created By: MK Admin 0.12"
    const datafield="createdAt"
    const value="MK Admin 0.12";

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

    //Click on filter icon 
    await test.step(`Click on filter icon`, async () => {
        await userPage.clickOnFilterButton();
    });

    //Click on the CreatedBy Field and Enters a name
    await test.step(`Click on  CreatedBy Field and Enters a name`,async() =>{
        await userPage.enterCreateFeildValue(value);
        
    });

    //Click on Apply Button
    await test.step(`Click on Apply Button`, async () => {
        await userPage.clickOnFilterApplyButton();
        
    });
   

    //Verify that  the createdBy chip is visible
    await test.step(`Verify that  the createdBy chip is visible`, async () => {
        expect.soft(await userPage.isFilterChipsVisible(chip1)).toBeTruthy()
    });


    //Verify if the createdBy field has applied filter
    await test.step(`Verify if the createdBy field has applied filter`, async () => {
        expect.soft(await userPage.isAllStausActive(value,datafield)).toBeTruthy();
    });    

});