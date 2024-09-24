import test, { expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { PheonixAppPage } from "../../Pages/PheonixAppPage";
import { getCompleteTimestamp } from "../../utils/common-utils";
import { EmailAddress, Password, Url } from "../../utils/config-utils";

test("Verify user with access to create company can create companies in phoenix application", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const pheonixAppPage = new PheonixAppPage(page);
  let timestamp: string;
  timestamp = getCompleteTimestamp();
  const fname: string = `AutoFname${timestamp}`;
  const lname: string = `AutoLname${timestamp}`;
  const email: string = `${timestamp}@gmail.com`;
  const lurl: string = `${timestamp}/linkedin.com`;

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Clicks on Create button in Phoenix application
  await test.step("Clicks on create button in phoenix applciation", async () => {
    await page.waitForSelector(".MuiPaper-root.MuiCard-root.css-17ebj6m");
    await pheonixAppPage.clickonAcitonButton();
  });
  //Clicks on Create Person button in menu
  await test.step('Clicks on create job in " + " menu', async () => {
    await pheonixAppPage.clickOnCreatePerson();
  });
  //Fills the first name, last name , email , linkedin url in create new person tab
  await test.step("fills firstname last name and email in create person tab", async () => {
    await pheonixAppPage.fillPersonNameEmail(fname, lname, email, lurl);
  });
  //Verify Wheather user is allowed to create person
  await test.step("Verify continue button is visible", async () => {
    const result = await pheonixAppPage.isSavePersonButtonVisible();
    expect(result).toBe(true);
  });
});
