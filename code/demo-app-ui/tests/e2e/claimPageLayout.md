# Claim Page Layout Test Scenarios

This document describes the scenarios covered by `claimPageLayout.spec.ts`.

## Covered scenario

### Claim page UI elements

- Logs in as the claimant user.
- Verifies that the user is redirected to the claims page.
- Verifies that the `Submit New Claim` button is visible.
- Fetches the claims table headers.
- Verifies that the table headers match the expected values:

```text
Claim ID
Date
Description
Amount
Status
Actions
```

## Test approach

The test uses the Page Object Model. Login actions are handled by `LoginPage`, while claims-page actions and table-header retrieval are handled by `ClaimsPage`.

Expected UI data is stored in `fixtures/testData.ts` instead of being repeated directly in the test.

## Execution

Run the layout test from the `demo-app-ui` directory:

```powershell
npx playwright test tests/e2e/claimPageLayout.spec.ts
```

Run it with the browser visible:

```powershell
npx playwright test tests/e2e/claimPageLayout.spec.ts --headed
```
