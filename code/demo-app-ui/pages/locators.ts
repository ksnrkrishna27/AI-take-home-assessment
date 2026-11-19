import { Locator, Page } from "@playwright/test";

export const loginLocators = (page: Page) => ({
  emailInput: page.locator('[name="email"]'),
  passwordInput: page.locator('[name="password"]'),
  loginButton: page.getByRole("button", { name: "Log In" }),
  welcomeMessage: page.getByText(/^Welcome, .+$/),
  logoutButton: page.getByRole("button", { name: "Logout" }),
  errorMessage: page.locator("p[role='alert']"),
});

export const claimPageLocators = (page: Page) => ({
  claimTableHeaders: page.locator("table thead tr th"),
  claimTableRows: page.locator("tbody tr"),
  claimDescriptionCell: (row: Locator) => row.locator("td").nth(2),
  claimAmountCell: (row: Locator) => row.locator("td").nth(3),
  submitNewClaimButton: page.getByRole("button", { name: "Submit New Claim" }),
  submitClaimTab: page.getByRole("button", { name: "Submit Claim" }),
  incidentDateInput: page.locator('input[name="incidentDate"]'),
  incidentLocationInput: page.locator('input[name="incidentLocation"]'),
  claimAmountInput: page.locator('input[name="claimAmount"]'),
  nextButton: page.locator('button[type="submit"]'),
  describeIncidentInput: page.locator('[id="description"]'),
  finalSubmitClaimButton: page.locator('//div/button[text()="Submit Claim"]'),
});
