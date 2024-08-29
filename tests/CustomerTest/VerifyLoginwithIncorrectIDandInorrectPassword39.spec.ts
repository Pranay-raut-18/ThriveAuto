import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import {Url} from "../../utils/config-utils"

test("verify login of a user",async({page})=>{
    const Password="King2$";
    const EmailAddress="qatesting+rayansh1@thrivetrm.com";
    const loginPage = new LoginPage(page);    

    //Verify Login with Incorrect ID and Incorrect Password 39
    await test.step(`Verify Login with Correct ID and Incorrect Password 02`, async () => {
        await loginPage.login(Url, EmailAddress, Password);   
        await expect(page.locator(".css-vsox4b")).toBeVisible();  
      });
})