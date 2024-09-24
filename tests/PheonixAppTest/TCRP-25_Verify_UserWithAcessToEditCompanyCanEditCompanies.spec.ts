import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { PheonixAppPage } from "../../Pages/PheonixAppPage";

test("To Verify that the System role with view functionality is able to view people in the Pheonix Appplication", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const pheonixAppPage = new PheonixAppPage(page);
  const tabtoclick: string = "Companies";
  const companytosearch: string = "Alteryx";

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });
  //Clicks on People tab in pheonix application
  await test.step("Click on people tab", async () => {
    await pheonixAppPage.clickTabByName(tabtoclick);
    await page.waitForLoadState("networkidle");
  });
  //Clicks on company name searched
  await test.step("Click on Search button to search for name of company to view", async () => {
    await pheonixAppPage.clickOnCompanySearchBar();
    await pheonixAppPage.entercompanyToSearch(companytosearch);
    await pheonixAppPage.clickTabByCompanyButton(companytosearch);
  });
  //Clicks on Edit button in comapany tab
  await test.step("Click on edit button in company tab", async () => {
    await pheonixAppPage.companyViewbarisVisible();
    await pheonixAppPage.clickonEditButtoninCompanyTab();
  });
  await test.step("Clicks on save button in edit company tab", async () => {
    await pheonixAppPage.clickonSaveButtoninEditCompanyTab();
    await (
      await page.waitForSelector(
        ".MuiAlert-standardSuccess.MuiAlert-standard.css-uu3s2k"
      )
    ).isVisible();
    expect(
      page.locator(".MuiAlert-standardSuccess.MuiAlert-standard.css-uu3s2k")
    ).toHaveText("Company successfully updated");
  });
});
