import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { ClaimsPage, type ClaimFlow } from "../../pages/claimsPage";
import { claimTestData, users } from "../../fixtures/testData";

const claimFlow = [
  { name: "Submit New Claim button", type: "button" as ClaimFlow },
  { name: "Submit Claim tab", type: "tab" as ClaimFlow },
];

test.describe("Claim Submission", () => {
  test.describe.configure({ mode: "serial" });

  for (const flow of claimFlow) {
    test(`submit a claim through the ${flow.name}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const claimsPage = new ClaimsPage(page);

      await loginPage.login(
        users.claimantUser.email,
        users.claimantUser.password,
      );

      await page.waitForURL("/claims");

      await claimsPage.openClaimForm(flow.type);
      await claimsPage.fillIncidentDetails(claimTestData);
      await claimsPage.fillDescriptionAndProceed(claimTestData.description);
      await claimsPage.finalSubmission();

      await page.waitForURL("/claims");
      await page.locator("tbody tr").first().waitFor({ state: "visible" });

      const expectedAmount = `$${claimTestData.claimAmount.toFixed(2)}`;
      const actualClaim = await claimsPage.getClaimDescriptionsAndAmounts();

      expect(actualClaim.description).toBe(claimTestData.description);
      expect(actualClaim.amount).toBe(expectedAmount);
    });
  }
});
