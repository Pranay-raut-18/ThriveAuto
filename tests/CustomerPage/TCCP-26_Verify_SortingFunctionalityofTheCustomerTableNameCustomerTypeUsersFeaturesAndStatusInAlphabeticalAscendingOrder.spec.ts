import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { UserPage } from "../../Pages/UserPage";
import { HomePage } from "../../Pages/HomePage";
import { CustomerPage } from "../../Pages/CustomerPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test("TCCP_26: CustomerPage | Verify the Sorting functionality of the Customer table Name, Customer type, Users, Features and Status in alphabetical, Ascending order", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const userPage = new UserPage(page);
  const customerPage = new CustomerPage(page);

  const feildNameForName = "name";
  const feildNameForCustomerType = "customerType";
  const feildNameForUser = "usersCount";
  const feildNameForFeatures = "featuresCount";
  const feildNameForStatus = "customerStatus";
  const sortingOrder = "Ascending";

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    page.waitForURL;
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Go to Admin Portal
  await test.step(`Go to Admin Portal`, async () => {
    await homePage.clickOnGoToAdminPortal();
  });

  //Click on Customer tab
  await test.step(`Click Customer tab`, async () => {
    await userPage.clickOnCustomerTab();
  });

  //Remove the Filter "Status Active" by clicking (X) button
  await test.step(`Remove the Filter "Status Active" by clicking (X) button`, async () => {
    await customerPage.removePreFilterStatus();
  });

  //Go to Name in the table and click Sorting button next to it (↑).
  await test.step(`Go to Name in the table and click Sorting button next to it (↑).`, async () => {
    await customerPage.clickOnArrowSortButton(feildNameForName);
    const { columnTextContent, sortedTextContent } = await customerPage.sortMethodForAColumn(feildNameForName,sortingOrder);
    expect(columnTextContent).toEqual(sortedTextContent);
  });

  //Go to Customer type in the table and click Sorting button next to it (↑).
  await test.step(`Go to Customer type in the table and click Sorting button next to it (↑).`, async () => {
    await customerPage.clickOnArrowSortButton(feildNameForCustomerType);
    const { columnTextContent, sortedTextContent } = await customerPage.sortMethodForAColumn(feildNameForCustomerType,sortingOrder);
    expect(columnTextContent).toEqual(sortedTextContent);
  });

  //Go to Users in the table and click Sorting button next to it (↑).
  await test.step(`Go to Users in the table and click Sorting button next to it (↑).`, async () => {
    await customerPage.clickOnArrowSortButton(feildNameForUser);
    const { columnTextContent, sortedTextContent } = await customerPage.sortMethodForAColumn(feildNameForUser,sortingOrder);
    expect(columnTextContent).toEqual(sortedTextContent);
  });

  //Go to Features in the table and click Sorting button next to it (↑).
  await test.step(`Go to Features in the table and click Sorting button next to it (↑).`, async () => {
    await customerPage.clickOnArrowSortButton(feildNameForFeatures);
    const { columnTextContent, sortedTextContent } = await customerPage.sortMethodForAColumn(feildNameForFeatures,sortingOrder);
    expect(columnTextContent).toEqual(sortedTextContent);
  });

  //Go to Status in the table and click Sorting button next to it (↑).
  await test.step(`Go to Status in the table and click Sorting button next to it (↑).`, async () => {
    await customerPage.clickOnArrowSortButton(feildNameForStatus);
    const { columnTextContent, sortedTextContent } = await customerPage.sortMethodForAColumn(feildNameForStatus,sortingOrder);
    expect(columnTextContent).toEqual(sortedTextContent);
  });
});
