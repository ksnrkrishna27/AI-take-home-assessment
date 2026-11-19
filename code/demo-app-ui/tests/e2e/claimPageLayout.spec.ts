import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { loginUsers, users, claimsUIData } from "../../fixtures/testData";
import { ClaimsPage } from "../../pages/claimsPage";

test.describe("Claim Page Layout Testing", () => {
  test("Claim Page Layout - Verify UI Elements", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const claimsPage = new ClaimsPage(page);
    await loginPage.login(
      users.claimantUser.email,
      users.claimantUser.password,
    );

    await page.waitForURL(loginUsers[0].url, { timeout: 10000 });

    await claimsPage.validateClaimSubmitButton();

    const claimTableHeaders = await claimsPage.getClaimTableHeaders();
    expect(claimTableHeaders).toEqual(claimsUIData.claimTableHeaders);
  });
});
