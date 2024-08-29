import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import {Url, Password } from "../../utils/config-utils"

test("verify login of a user",async({page})=>{
    const EmailAddress="qatesting+rayansh1@thrivetrm.com";
    const loginPage = new LoginPage(page);    

    //Verify Login with IncorrectID and Correct Password 01
    await test.step(`Verify Login with IncorrectID and Correct Password 01`, async () => {
        await loginPage.login(Url, EmailAddress, Password);   
        await expect(page.locator(".css-vsox4b")).toBeVisible();  
      });
})