import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_36:UserPage|Verify that resetting the filters removes all applied filters from the user list', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    

    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);
    });

    //Go to Admin Potal 
    await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
    });

    //Click on filter icon 
    await test.step(`Click on filter icon`, async () => {
        await userPage.clickOnFilterButton();

    });

    //Enter values in the Role,CreatedBy and Status Filters
    await test.step(`Enter values in the Role,CreatedBy and Status Filters`, async () =>{
        await userPage.applyThreeFilters('Admin','MK Admin 0.12','Active');
    })

    //Select the dates in the LogIn and Created Fields
    await test.step(`Select the dates in the LogIn and Created Fields`, async () => {
        await userPage.SelectDate("July","1",0);
        await userPage.SelectDate("August","1",1);
        await userPage.SelectDate("July","1",2);
        await userPage.SelectDate("July","30",3);
        
    });
   
    //click on Filter Reset Button
    await test.step(`click on Filter Reset Button`, async () => {
        await userPage.clickOnFilterResetButton();
    });

    //Click on Apply Button
    await test.step(`Click on Apply Button`, async () => {
        await userPage.clickOnFilterApplyButton();
        
    });

    //Verify that no filter is applied
    await test.step(`Verify that no filter chips are visible`, async () => {
        expect (userPage.isAllFilterChipsRemoved).toBeTruthy();
    });





     


});    