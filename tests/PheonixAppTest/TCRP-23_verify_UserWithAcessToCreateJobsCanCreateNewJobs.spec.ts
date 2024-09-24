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
  const inputTitleName: string = `AutoTitleName${timestamp}`;
  const hiringCompanyName: string = "tesla";
  const teamLead: string = "Manjeet Kumar";

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Clicks on Create button in Phoenix application
  await test.step("Clicks on create button in phoenix applciation", async () => {
    await page.waitForSelector(".MuiPaper-root.MuiCard-root.css-17ebj6m");
    await pheonixAppPage.clickonAcitonButton();
  });
  //Clicks on Create Job button in menu
  await test.step("Clicks on create job in " + " menu", async () => {
    await pheonixAppPage.clickOnCreateProjects();
  });
  //Fill the required fields to create a project
  await test.step("Fills all the input field to enable create project button", async () => {
    await pheonixAppPage.fillProjectDetailsinProject(
      inputTitleName,
      hiringCompanyName,
      teamLead
    );
  });
  //Verify if Create a project button is visible
  await test.step("Checks wheather the create prjoect button is viisible or not", async () => {
    const result = await pheonixAppPage.saveButtonProject.isEnabled();
    expect(result).toBe(true);
  });
});
