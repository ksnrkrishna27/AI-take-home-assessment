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

## Planned work not implemented due to time

The following areas were identified as valuable but were not completed in the available assessment time:

- Empty-field and invalid-email validation.
- GitHub Actions execution and validation for the repository.
- Implement a vault-based solution for securely storing credentials.

## Risk-based prioritization

Authentication was selected first because a failure there blocks every protected workflow. The next highest-risk journey is the end-to-end claim lifecycle: create a claim, process it as an administrator, and verify the resulting status for the claimant.

## Known limitations

- The current Playwright suite focuses on login and does not yet validate the complete claim lifecycle.
- Test users are provided by the demo application environment.
- Load and visual testing were considered out of scope for the available time.
