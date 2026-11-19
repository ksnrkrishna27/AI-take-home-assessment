# Testing Approach

## Objective

The assessment focuses on the highest-risk user journeys in the demo claims application. The initial priority is authentication and role-based access because all claimant and administrator workflows depend on successful login and correct redirection.

## Implemented coverage

### UI end-to-end tests

The Playwright login suite currently covers:

- Successful login for a claimant user.
- Successful login for an administrator user.
- Role-specific redirection after login.
- Role-specific welcome message verification.
- Invalid credentials.
- Logout after successful login.

The tests use a functional data-driven approach so the same positive-login flow is executed for both user roles. Page actions are kept in `pages/loginPage.ts`, locators are kept in `pages/locators.ts`, and test data is kept in `fixtures/testData.ts`.

### Claims UI and lifecycle tests

The Playwright suite also covers:

- Claims page layout and expected table headers.
- Claim submission through the `Submit New Claim` button.
- Claim submission through the `Submit Claim` navigation tab.
- Minimum description length validation.
- Visibility of a newly submitted claim to an administrator.
- Separate claimant and administrator browser contexts.
- Status transitions from `Submitted` to `Under Review` and `Rejected`.
- Status transitions from `Under Review` to `Approved`, `Rejected`, and `Submitted`.

### API test coverage

The API suite covers successful claim submission through `POST /api/claims` after claimant authentication. It verifies the `201` response, claim ID, description, amount, and initial `SUBMITTED` status. API request logic is kept in `api/claimsApi.ts`.

## Planned work not implemented due to time

The following areas were identified as valuable but were not completed in the available assessment time:

- Empty-field and invalid-email validation.
- GitHub Actions execution and validation for the repository.
- Implement a vault-based solution for securely storing credentials.
- Unauthenticated and role-based access validation.
- API negative and boundary validation tests.
- Backend integration and contract tests.
- Visual regression testing.
- Load or performance testing.

## Risk-based prioritization

Authentication was selected first because a failure there blocks every protected workflow. The next highest-risk journey is the end-to-end claim lifecycle: create a claim, process it as an administrator, and verify the resulting status for the claimant.
