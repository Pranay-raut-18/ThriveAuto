import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { PheonixAppPage } from "../../Pages/PheonixAppPage";

test("To Verify Url of People ,Projects , Companies", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const pheonixAppPage = new PheonixAppPage(page);
  const tabtoclick1: string = "People";
  const tabtoclick2: string = "Companies";
  const tabtoclick3: string = "Projects";

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });
  //Clicks on People tab in pheonix application
  await test.step("Click on people tab and check url", async () => {
    await pheonixAppPage.clickTabByName(tabtoclick1);
    const currentUrl = page.url();
    await page.waitForURL(currentUrl);
    const actualUrlSegment = currentUrl.split("/").pop();
    expect(actualUrlSegment).toEqual(tabtoclick1.toLocaleLowerCase());
  });
  //Clicks on Companies tab in pheonix application
  await test.step("Click on Companies tab and check url", async () => {
    await pheonixAppPage.clickTabByName(tabtoclick2);
    const currentUrl = page.url();
    await page.waitForURL(currentUrl);
    const actualUrlSegment = currentUrl.split("/").pop();
    expect(actualUrlSegment).toEqual(tabtoclick2.toLocaleLowerCase());
  });
  //Clicks on Companies tab in pheonix application
  await test.step("Click on Projects tab and check url", async () => {
    await pheonixAppPage.clickTabByName(tabtoclick3);
    const currentUrl = page.url();
    await page.waitForURL(currentUrl);
    const actualUrlSegment = currentUrl.split("/").pop();
    expect(actualUrlSegment).toEqual("jobs");
  });
});
