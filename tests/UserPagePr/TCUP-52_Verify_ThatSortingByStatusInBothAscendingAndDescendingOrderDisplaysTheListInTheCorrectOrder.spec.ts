import { test, expect } from '@playwright/test';
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import { UserPagePr } from '../../Pages/UserPagePr';
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils"


test('TCUP_52:UserPage | Verify Sorting by Status  in both ascending and descending order displays the list in the correct order.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const userPage = new UserPage(page);
    const userPagepr = new UserPagePr(page);

    const feildNameForName = "Status";
    const sortingOrderAsce = "Ascending";
    const sortingOrderDesc = "Decending";

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
    
    // Click on the "Status" column header to sort the users alphabetically from A-Z
    await test.step(`Click on the "Status" column header to sort the users alphabetically from A-Z`, async () => {
    await userPagepr.clickOnHeaderColumn(feildNameForName);
    });
    
    // Verify the list is sorted in ascending order by the Status Column
    await test.step(`Verify the list is sorted in ascending order by the Status Column`, async () => {
        const { columnTextContent, sortedTextContent } = await userPagepr.sortMethodForAColumn(feildNameForName,sortingOrderAsce);
        expect(columnTextContent).toEqual(sortedTextContent);
    });
    
    // Click on the "Status" column header again to sort the users alphabetically from Z-A.
    await test.step(`Click on the "Status" column header again to sort the users alphabetically from Z-A.`, async () => {
        await userPagepr.clickOnHeaderColumn(feildNameForName);
    });
    
    // Verify list is sorted in descending order by the Status Column
    await test.step(`Verify list is sorted in descending order by the Status Column`, async () => {
        const { columnTextContent, sortedTextContent } = await userPagepr.sortMethodForAColumn(feildNameForName,sortingOrderDesc);
        expect(columnTextContent).toEqual(sortedTextContent);
    });

});    