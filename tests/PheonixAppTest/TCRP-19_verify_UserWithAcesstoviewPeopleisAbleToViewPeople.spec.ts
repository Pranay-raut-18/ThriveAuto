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
  const persontosearch: string = "佐藤昌宏";

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
  });
  //Checks weather user is able to view people
  await test.step("check weather user is able to view name", async () => {
    const result = await pheonixAppPage.checkifNameinViewisVisible();
    expect(result).toBe(true);
  });
});
