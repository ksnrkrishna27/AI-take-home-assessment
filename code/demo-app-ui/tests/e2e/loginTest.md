# Login Test Scenarios

This document describes the scenarios covered by `loginTest.spec.ts`.

## Test approach

The tests use Playwright with the Page Object Model. Login actions are handled by `LoginPage`, while users, expected URLs, welcome messages, and error messages are stored in `fixtures/testData.ts`.

## Covered scenarios

### 1. Claimant successful login

- Uses the Claimant test user.
- Submits valid email and password.
- Verifies that the user is redirected to `/claims`.
- Verifies the welcome message: `Welcome, Test Claimant`.
- Logs out after the test.

### 2. Admin successful login

- Uses the Admin test user.
- Submits valid email and password.
- Verifies that the user is redirected to `/admin/dashboard`.
- Verifies the welcome message: `Welcome, Admin User`.
- Logs out after the test.

### 3. Invalid credentials

- Uses an invalid email and password.
- Verifies that the login error message is displayed.
- Expected message: `Invalid email or password`.

## Execution

Run the complete login test file from the `demo-app-ui` directory:

```powershell
npx playwright test tests/e2e/loginTest.spec.ts
```

Run it with the browser visible:

```powershell
npx playwright test tests/e2e/loginTest.spec.ts --headed
```
