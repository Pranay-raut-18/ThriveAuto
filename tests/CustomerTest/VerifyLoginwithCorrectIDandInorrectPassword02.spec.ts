import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import {Url,EmailAddress} from "../../utils/config-utils"

test("verify login of a user",async({page})=>{
    const Password="King2$";
    const loginPage = new LoginPage(page);    

    //Verify Login with Correct ID and Incorrect Password 02
    await test.step(`Verify Login with Correct ID and Incorrect Password 02`, async () => {
        await loginPage.login(Url, EmailAddress, Password);   
        await expect(page.locator(".css-vsox4b")).toBeVisible();  
      });
})