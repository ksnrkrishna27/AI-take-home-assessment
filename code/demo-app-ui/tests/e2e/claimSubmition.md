# Claim Submission Test Scenarios

This document describes the scenarios covered by `claimSubmition.spec.ts`.

## Test approach

The tests use Playwright with the Page Object Model. The same claim-submission flow is reused for both available entry points. Only the navigation step is selected through a parameter.

The test suite runs serially because both scenarios use the same claimant account and shared application data.

## Covered scenarios

### 1. Submit a claim through the Submit New Claim button

- Logs in as the claimant user.
- Opens the claim form through the `Submit New Claim` button.
- Enters the incident date.
- Enters a Faker-generated incident address.
- Enters the claim amount.
- Continues to the supporting details step.
- Verifies that the Next button is disabled when the description contains only 9 characters.
- Enters a valid description with more than 10 characters.
- Verifies that the Next button becomes enabled.
- Reviews and submits the claim.
- Verifies that the newly created claim appears in the first table row.
- Compares the actual Description and Amount with the expected test data.

### 2. Submit a claim through the Submit Claim tab

The same validations and submission flow are repeated, with the claim form opened through the `Submit Claim` navigation tab.

## Test data

Claim data is stored in `fixtures/testData.ts`:

- Incident date: dynamically generated as the previous date.
- Incident location: generated using Faker.
- Claim amount: `$250.50`.
- Description: a valid description longer than the minimum requirement.

## Execution

Run the claim submission spec from the `demo-app-ui` directory:

```powershell
npx playwright test tests/e2e/claimSubmition.spec.ts
```

Run it with the browser visible:

```powershell
npx playwright test tests/e2e/claimSubmition.spec.ts --headed
```
