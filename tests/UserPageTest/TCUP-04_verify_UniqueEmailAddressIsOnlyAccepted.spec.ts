import {test, expect} from '@playwright/test';
import {LoginPage} from "../../Pages/LoginPage";
import { UserPage } from '../../Pages/UserPage';
import {HomePage} from "../../Pages/HomePage";
import {Url, EmailAddress, Password } from "../../utils/config-utils"
import { getCompleteTimestamp } from "../../utils/common-utils"

test('TCUP_04:UserPage|Verify unique email address is only accepted.',async({page})=>{
    const loginPage = new LoginPage(page);              
    const userPage = new UserPage(page);       
    const homePage = new HomePage(page); 
    let timestamp:string  
    timestamp=getCompleteTimestamp();
    const Fname:string="Test";
    const Lname:string=`User${timestamp}`;
    let existingemail: any;
    const reqrole:string='Admin';
    const expuniqueemailmsg:string="must be unique";
    
    //Login using email address and password
    await test.step(`Login using email address and password`, async () => {
        await loginPage.login(Url, EmailAddress, Password);    
      });
  
      //Go to Admin Potal 
      await test.step(`Go to Admin Potal Customer tab`, async () => {
        await homePage.clickOnGoToAdminPortal();
        
      })

    // Get an Existing email id
    await test.step('Get an Existing email id',async()=>{
        existingemail=await userPage.getExistingEmail();
    })

    //Click on Adduser icon
    await test.step(`Click on Adduser icon`, async () => {
        await userPage.clickOnAddUserIcon();
      })

   //Enter all the feilds of AddUser Table
    await test.step(`Enter all the feilds of AddUser Table`, async () => {
      await userPage.enterAllFields(Fname,Lname,existingemail,reqrole);
  })

    //Click on AddandSendInvite Button
    await test.step('Click on AddandSendInvite Button', async() =>{
        await userPage.clickAddButton();
        
    });
    //Verify Unique Email required message is visible after clicking add button
    await test.step('Verify Unique Email required message is visible after clicking add button', async() =>{
         expect.soft(await (userPage.getUniqueEmailMessage())).toBe(expuniqueemailmsg);
    })
})   