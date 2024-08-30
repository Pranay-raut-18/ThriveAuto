import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import {HomePage} from "../../Pages/HomePage";
import {Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('Verify that a new user can be created',async({page})=>{
    const loginPage = new LoginPage(page);       
   // const customerPage = new CustomerPage(page);       
    const userPage = new UserPage(page);       
    const homePage = new HomePage(page); 
    let timestamp:string  
    timestamp=getCompleteTimestamp();
    const Fname:string="AutoFname";
    const Lname:string=`AutoLname${timestamp}`;
    const email:string= Lname+"@test.com";
    const reqrole:string='Admin';
    const expsucessmessage:string= `${Fname} ${Lname} successfully invited`;
    
    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);    
      });
  
      //Go to Admin Potal 
      await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
        
      })

       //Clear preapplied filter
      await test.step(`Clear preapplied filter`, async () => {
        await userPage.ClearFilter();
        
      });

      //Click on Adduser icon
      await test.step(`Click on Adduser icon`, async () => {
        await userPage.clickOnAddUserIcon();
      })

      //Enter FirstName
      await test.step('Enter First Name', async() =>{
        await userPage.enterFirstName(Fname);
      })

      //Enter LastName
      await test.step('Enter Last Name', async() =>{
        await userPage.enterLastName(Lname);
      })

    //Enter Email
    await test.step('Enter Email', async() =>{
        await userPage.enterEmail(email);
      })
    
    //Click on roleFeild
    await test.step('Click on roleFeild', async() =>{
        await userPage.clickOnRoleButton();

     })

    //Select Role
    await test.step('Select Role', async() =>{
        await userPage.selectRoleFromDropdown(reqrole);
        
    });

    //Click on AddandSendInvite Button
    await test.step('Click on AddandSendInvite Button', async() =>{
        await userPage.clickAddbutton();
        
    });
      
    //verify success message is shown after adding user
    await test.step('Verify sucess message is shown after adding user', async() =>{
        expect.soft(await userPage.getSucessMeessage()).toBe(expsucessmessage);
    });
    
    //verify the username in the user list
    await test.step('Verify the user name in the user list', async () => {
    await expect(await userPage.checkUser(email)).toBeVisible({
        timeout: 5000
    });
});

})

