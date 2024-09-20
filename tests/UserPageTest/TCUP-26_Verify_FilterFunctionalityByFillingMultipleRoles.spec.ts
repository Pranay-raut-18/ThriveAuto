import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_26:UserPage| Verify  Filter functionality by filling Multiple roles', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const role1:string = "Admin",role2:string ="Candidate",role3="Partner";
    const chip1:string="Role: Admin",chip2:string="Role: Candidate",chip3:string="Role: Partner"
    const datafield="role";
    let exproleValue:string[]=[role1,role2,role3]
    let actroleValue:string[];
    

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

    //Click on the Role Field and Enters a Role
    await test.step(`Click on Role field and enter roles`,async() =>{
        await userPage.clickFilterRole(role1,role2,role3);
        
    });

    //Click on Apply Button
    await test.step(`Click on Apply Button`, async () => {
        await userPage.clickOnFilterApplyButton();
    });

    //Get all the values from the Role field
    await test.step(`Get all the values from the Role field`, async () => {
        actroleValue = await userPage.getFilterValues(datafield);
    })

    //Verify that all the selected roles's chips are visible
    await test.step(`Verify that all the selected roles's chips are visible`, async () => {
        expect.soft(await userPage.isFilterChipsVisible(chip1,chip2,chip3)).toBeTruthy()
    });

    //Verify if the Role field has all the selected roles
    await test.step(`Verify if the Role field has all the selected roles`, async () => {
        expect.soft(actroleValue.every(role=>exproleValue.includes(role))).toBeTruthy();  
    });

});