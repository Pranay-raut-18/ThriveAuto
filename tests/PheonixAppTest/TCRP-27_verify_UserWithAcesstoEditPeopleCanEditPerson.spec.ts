import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { PheonixAppPage } from "../../Pages/PheonixAppPage";

test("To Verify that the System role with view functionality is able to view people in the Pheonix Appplication", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const pheonixAppPage = new PheonixAppPage(page);
  const tabtoclick: string = "People";
  const persontosearch: string = 'Cemil " ALP " Sonmez';

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });
  //Clicks on People tab in pheonix application
  await test.step("Click on people tab", async () => {
    await pheonixAppPage.clickTabByName(tabtoclick);
  });
  //Clicks on search bar and fills the name
  await test.step("Click on Search button to search for name of person to view", async () => {
    await pheonixAppPage.clickOnSearchBar();
    await pheonixAppPage.enterTextToSearch(persontosearch);
    await pheonixAppPage.clickSearchResultByName(persontosearch);
    await page.waitForLoadState("networkidle");
    await page.locator(".css-afwwpk button").click();
    await page.locator(".css-xhilgd").hover();
    await page
      .locator(
        ".MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeSmall.css-1c6vowq"
      )
      .click();
  });
});