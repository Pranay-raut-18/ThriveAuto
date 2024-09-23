import { expect, test } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { PheonixAppPage } from "../../Pages/PheonixAppPage";
import { EmailAddress, Password, Url } from "../../utils/config-utils";
import { getCompleteTimestamp } from "../../utils/common-utils";

test("Verify user with access to create company can create companies in phoenix application", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const pheonixAppPage = new PheonixAppPage(page);
  let timestamp: string;
  timestamp = getCompleteTimestamp();
  const inputCompanyName: string = `AutoCompanyName${timestamp}`;

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Clicks on Create button in Phoenix application
  await test.step("Clicks on create button in phoenix applciation", async () => {
    await page.waitForSelector(".MuiPaper-root.MuiCard-root.css-17ebj6m");
    await pheonixAppPage.clickonAcitonButton();
  });

  //Clicks on Create Company button in menu
  await test.step("Clicks on create a new company button in menu", async () => {
    await pheonixAppPage.clickOnCreateNewCompanyButton();
  });
  //Input Company Name and URL
  await test.step("Fills company name and url", async () => {
    await pheonixAppPage.enterCompanyName(inputCompanyName);
  });
  //verify if continue button is visible
  await test.step("Verify if continue button is enabled", async () => {
    const result = await pheonixAppPage.isSaveCompanyButtonVisible();
    expect(result).toBe(true);
  });
});
