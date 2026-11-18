# AI Collaboration Notes

## Purpose

AI assistance was used as a development aid during the assessment. All generated suggestions were reviewed and adapted to the application before being kept in the repository.

## Areas where AI assistance was used

- Understanding the repository structure and application startup requirements.
- Troubleshooting Docker, Maven, port, and generated API setup issues.

## Human review and decisions

- The application behavior and routes were inspected before selecting the login scenarios.
- The claimant and administrator redirect URLs were verified from the application code.
- The Page Object Model structure was chosen to keep actions, locators, data, and scenarios separate.
- The test scope was intentionally prioritized around authentication because it is a prerequisite for the protected claims workflows.
- Planned tests were recorded instead of claiming coverage that was not implemented.
- Identifying the correct Playwright configuration and test directory.
- Designing the Playwright Page Object Model structure.
- Improving locator choices by using accessible Playwright locators.
- Refactoring login coverage into a data-driven test for claimant and administrator users.
- Creating the testing approach and documenting coverage decisions.

## Current outcome

The repository contains a working Playwright login suite with positive claimant and administrator scenarios, invalid credentials coverage, reusable test data, and Page Object Model support.

The remaining claim lifecycle, API, visual, and load tests are documented in `TESTING_APPROACH.md` as future work that was not completed within the available assessment time.
