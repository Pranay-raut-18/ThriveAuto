import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import {Url, Password } from "../../utils/config-utils"

test("Verify Login with IncorrectID and Correct Password 01",async({page})=>{
    const EmailAddress="qatesting+rayansh1@thrivetrm.com";
    const loginPage = new LoginPage(page);    

    //Login with ID and Password
    await test.step(`Login with ID and Password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);   
      });
      
      //Verify an Error message appeared on the sceen
      await test.step(`Verify an Error message appeared on the sceen`, async () => {
        await expect(page.locator(".css-vsox4b")).toBeVisible();   
      })
})