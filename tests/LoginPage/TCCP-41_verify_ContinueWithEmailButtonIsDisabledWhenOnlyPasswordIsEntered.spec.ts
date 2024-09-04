import {test, expect} from '@playwright/test';
import {Url,Password} from "../../utils/config-utils"


test("TCCP_41:LoginPage | Verify 'Continue With Email' button is Disabled  when only password is entered",async({page})=>{
            
      //Go to url and enter only email address
      await test.step(`Go to url and enter only email address`, async () => {
            await page.goto(Url);
            await page.locator("#username").fill(Password);
      });

      //Verify 'Continue With Email' is Disabled on the sceen
      await test.step(`Verify 'Continue With Email' is not visible on the sceen`, async () => {
            await expect(page.getByRole('button', { name: 'Continue with email' })).toBeDisabled(); 
      
      })
})