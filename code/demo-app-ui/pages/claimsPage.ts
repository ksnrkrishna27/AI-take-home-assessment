import { expect, Page } from "@playwright/test";
import { claimPageLocators } from "./locators";

export type ClaimFlow = "button" | "tab";

export interface IncidentDetails {
  incidentDate: string;
  incidentLocation: string;
  claimAmount: number;
}

export interface ClaimTableData {
  description: string;
  amount: string;
}

export interface ClaimSummary {
  claimId: string;
  amount: string;
  status: string;
}

export class ClaimsPage {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async getClaimTableHeaders(): Promise<string[]> {
    const headers = await this.page
      .locator("table thead tr th")
      .allTextContents();
    return headers;
  }

  async getClaimDescriptionsAndAmounts(): Promise<ClaimTableData> {
    const locators = claimPageLocators(this.page);
    const firstRow = locators.claimTableRows.first();
    const descriptionCell = locators.claimDescriptionCell(firstRow);
    const fullDescription = await descriptionCell
      .locator("span")
      .getAttribute("title");

    return {
      description: fullDescription ?? (await descriptionCell.innerText()),
      amount: await locators.claimAmountCell(firstRow).innerText(),
    };
  }

  async getFirstClaimSummary(): Promise<ClaimSummary> {
    const locators = claimPageLocators(this.page);
    const firstRow = locators.claimTableRows.first();

    return {
      claimId: await locators.claimIdCell(firstRow).innerText(),
      amount: await locators.claimAmountCell(firstRow).innerText(),
      status: await firstRow.getByRole("status").innerText(),
    };
  }

  async getFirstClaimStatus(): Promise<string> {
    const locators = claimPageLocators(this.page);
    return locators.claimStatusCell(locators.claimTableRows.first()).innerText();
  }

  async refreshClaims(): Promise<void> {
    await this.page.reload();
    await this.page.locator("tbody tr").first().waitFor({ state: "visible" });
  }

  async validateClaimSubmitButton(): Promise<void> {
    const locators = claimPageLocators(this.page);
    const submitButton = locators.submitNewClaimButton;
    await submitButton.waitFor({ state: "visible", timeout: 5000 });
  }

  async openClaimForm(flow: ClaimFlow): Promise<void> {
    const locators = claimPageLocators(this.page);

    if (flow === "button") {
      await locators.submitNewClaimButton.click();
    } else {
      await locators.submitClaimTab.click();
    }

    await this.page.waitForURL("/claims/new");
  }

  async fillIncidentDetails(details: IncidentDetails): Promise<void> {
    const locators = claimPageLocators(this.page);

    await locators.incidentDateInput.fill(details.incidentDate);
    await locators.incidentLocationInput.fill(details.incidentLocation);
    await locators.claimAmountInput.fill(details.claimAmount.toString());
    await locators.nextButton.click({ delay: 5000 });
  }

  async fillDescriptionAndProceed(description: string): Promise<void> {
    const locators = claimPageLocators(this.page);

    await locators.describeIncidentInput.fill("123456789");
    await expect(locators.nextButton).toBeDisabled();

    await locators.describeIncidentInput.fill(description);
    await expect(locators.nextButton).toBeEnabled();
    await locators.nextButton.click();
  }

  async finalSubmission(): Promise<void> {
    const locators = claimPageLocators(this.page);
    await locators.finalSubmitClaimButton.click();
  }

  async submitNewClaim(details: IncidentDetails, description: string): Promise<void> {
    await this.openClaimForm("button");
    await this.fillIncidentDetails(details);
    await this.fillDescriptionAndProceed(description);
    await this.finalSubmission();
  }
}
