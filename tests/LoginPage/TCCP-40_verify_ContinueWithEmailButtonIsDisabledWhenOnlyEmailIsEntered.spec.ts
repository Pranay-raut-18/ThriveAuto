import {test, expect} from '@playwright/test';
import {Url,EmailAddress} from "../../utils/config-utils"


test("TCCP_40:LoginPage | Verify 'Continue With Email' button is not visible when only email is entered",async({page})=>{
            
      //Go to url and enter only email address
      await test.step(`Go to url and enter only email address`, async () => {
            await page.goto(Url);
            await page.locator("#username").fill(EmailAddress);
      });

      //Verify 'Continue With Email' is Disabled on the sceen
      await test.step(`Verify 'Continue With Email' is not visible on the sceen`, async () => {
            await expect(page.getByRole('button', { name: 'Continue with email' })).toBeDisabled(); 
      
      })
})