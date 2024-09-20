import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import { PheonixAppPage } from "../../Pages/PheonixAppPage";

test("To Verify that the System role with view functionality is able to view people in the Pheonix Appplication", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const pheonixAppPage = new PheonixAppPage(page);
  const tabtoclick: string = "Projects";
  const jobtosearch: string = "CEO";
  const companytoseach: string = "tesla";

  // Login using email address and password
  await test.step("Login using email address and password", async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });
  //Clicks on People tab in pheonix application
  await test.step("Click on people tab", async () => {
    await pheonixAppPage.clickTabByName(tabtoclick);
    await page.waitForLoadState("networkidle");
  });
  //Clicks on Search bar and fills the name of job to search
  await test.step("Clicks on search bar and fills the text", async () => {
    await pheonixAppPage.ClickonSearchbarinProjects();
    await pheonixAppPage.fillinSearchofProjects(companytoseach);
  });
  //Clicks on job selected
  await test.step("Click on job specific", async () => {
    await pheonixAppPage.clickJobByTitleAndCompany(jobtosearch, companytoseach);
  });
  //Verify if the job selected is visible
  await test.step("Verify after clicking on job user is able to view job", async () => {
    expect(page.locator(".MuiStack-root.css-ak720g")).toBeVisible();
  });
});
