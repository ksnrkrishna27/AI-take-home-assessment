import { expect, test } from "@playwright/test";
import {
  AdminClaimsPage,
  claimStatusLabels,
  type ClaimStatus,
} from "../../pages/adminClaimsPage";
import { ClaimsPage } from "../../pages/claimsPage";
import { LoginPage } from "../../pages/loginPage";
import { claimTestData, users } from "../../fixtures/testData";

const statusFlows: Array<{
  name: string;
  firstStatus?: ClaimStatus;
  finalStatus: ClaimStatus;
}> = [
  { name: "Submitted to Under Review", finalStatus: "UNDER_REVIEW" },
  { name: "Submitted to Rejected", finalStatus: "REJECTED" },
  {
    name: "Under Review to Approved",
    firstStatus: "UNDER_REVIEW",
    finalStatus: "APPROVED",
  },
  {
    name: "Under Review to Rejected",
    firstStatus: "UNDER_REVIEW",
    finalStatus: "REJECTED",
  },
  {
    name: "Under Review to Submitted",
    firstStatus: "UNDER_REVIEW",
    finalStatus: "SUBMITTED",
  },
];

test.describe("Claim lifecycle", () => {
  test.describe.configure({ mode: "serial" });

  test("claimant submission is visible to the administrator", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const claimsPage = new ClaimsPage(page);

    await loginPage.login(
      users.claimantUser.email,
      users.claimantUser.password,
    );
    await page.waitForURL("/claims");

    await claimsPage.submitNewClaim(claimTestData, claimTestData.description);
    await page.waitForURL("/claims");
    await page.locator("tbody tr").first().waitFor({ state: "visible" });

    const claimantClaim = await claimsPage.getFirstClaimSummary();

    await loginPage.logout();
    await loginPage.login(users.adminUser.email, users.adminUser.password);
    await page.waitForURL("/admin/dashboard");

    const adminClaimsPage = new AdminClaimsPage(page);
    await adminClaimsPage.openClaims();

    const adminClaim = await adminClaimsPage.getFirstClaimSummary();

    expect(adminClaim.claimId).toBe(claimantClaim.claimId);
    expect(adminClaim.amount).toBe(claimantClaim.amount);
    expect(adminClaim.status).toBe("Submitted");
  });

  for (const flow of statusFlows) {
    test(`updates status: ${flow.name}`, async ({ browser }) => {
      const claimantContext = await browser.newContext();
      const adminContext = await browser.newContext();
      const claimantPage = await claimantContext.newPage();
      const adminPage = await adminContext.newPage();

      try {
        const claimantLogin = new LoginPage(claimantPage);
        const claimantClaims = new ClaimsPage(claimantPage);
        const adminLogin = new LoginPage(adminPage);
        const adminClaims = new AdminClaimsPage(adminPage);

        await claimantLogin.login(
          users.claimantUser.email,
          users.claimantUser.password,
        );
        await claimantPage.waitForURL("/claims");

        await claimantClaims.submitNewClaim(
          claimTestData,
          claimTestData.description,
        );
        await claimantPage.waitForURL("/claims");

        await adminLogin.login(users.adminUser.email, users.adminUser.password);
        await adminPage.waitForURL("/admin/dashboard");
        await adminClaims.openClaims();

        if (flow.firstStatus) {
          await adminClaims.updateFirstClaimStatus(flow.firstStatus);
          await claimantClaims.refreshClaims();
          expect(await claimantClaims.getFirstClaimStatus()).toBe(
            claimStatusLabels[flow.firstStatus],
          );
        }

        await adminClaims.updateFirstClaimStatus(flow.finalStatus);
        await claimantClaims.refreshClaims();

        expect(await claimantClaims.getFirstClaimStatus()).toBe(
          claimStatusLabels[flow.finalStatus],
        );
      } finally {
        await claimantContext.close();
        await adminContext.close();
      }
    });
  }
});
