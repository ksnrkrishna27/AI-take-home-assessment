# Claim Lifecycle Test Scenarios

This document describes the scenarios covered by `claimLifecycle.spec.ts`.

## Scenario 1: Claim visibility for an administrator

- Logs in as a claimant in the user session.
- Submits a new claim using `submitNewClaim()`.
- Captures the claimant's claim ID, amount, and status.
- Logs out from the claimant session.
- Logs in as an administrator.
- Opens the Claims page.
- Compares the first administrator claim row with the claimant values.
- Verifies that the initial status is `Submitted`.

## Scenario 2: Claim status transitions

The test uses separate browser contexts for the claimant and administrator so both sessions remain active independently.

The following transitions are covered:

```text
Submitted → Under Review
Submitted → Rejected
Under Review → Approved
Under Review → Rejected
Under Review → Submitted
```

After each administrator update, the claimant page is refreshed and the displayed status is verified.

Separate claims are created for each transition because the application does not allow every status transition from the same claim.

## Execution

Run the lifecycle tests from the `demo-app-ui` directory:

```powershell
npx playwright test tests/e2e/claimLifecycle.spec.ts
```

Run with the browser visible:

```powershell
npx playwright test tests/e2e/claimLifecycle.spec.ts --headed
```
