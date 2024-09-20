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
  const companytosearch: string = "ABB";

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
  //Checks Wheather company view tab is visible
  await test.step("Checks wheather company tab is visible", async () => {
    const result = await pheonixAppPage.companyViewbarisVisible();
    expect(result).toBe(true);
  });
});
