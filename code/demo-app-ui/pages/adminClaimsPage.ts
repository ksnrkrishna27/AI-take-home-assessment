import { expect, Page } from "@playwright/test";
import { adminClaimsPageLocators } from "./locators";

export type ClaimStatus =
  | "UNDER_REVIEW"
  | "REJECTED"
  | "APPROVED"
  | "SUBMITTED";

export const claimStatusLabels: Record<ClaimStatus, string> = {
  UNDER_REVIEW: "Under Review",
  REJECTED: "Rejected",
  APPROVED: "Approved",
  SUBMITTED: "Submitted",
};

export class AdminClaimsPage {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async openClaims(): Promise<void> {
    const locators = adminClaimsPageLocators(this.page);

    await locators.claimsButton.click();
    await this.page.waitForURL("/admin/claims");
  }

  async getFirstClaimSummary() {
    const locators = adminClaimsPageLocators(this.page);
    const firstRow = locators.claimTableRows.first();

    return {
      claimId: await locators.claimIdCell(firstRow).innerText(),
      amount: await locators.claimAmountCell(firstRow).innerText(),
      status: await locators.claimStatusCell(firstRow).innerText(),
    };
  }

  async updateFirstClaimStatus(status: ClaimStatus): Promise<void> {
    const locators = adminClaimsPageLocators(this.page);
    const firstRow = locators.claimTableRows.first();

    await locators.statusSelect(firstRow).selectOption({ value: status });
    await locators.confirmStatusButton.click();
    await expect(
      this.page.getByText(`Claim status updated to ${claimStatusLabels[status]}`),
    ).toBeVisible();
  }
}
