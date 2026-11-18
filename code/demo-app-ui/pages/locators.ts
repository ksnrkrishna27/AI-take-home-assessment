import { Page } from "@playwright/test";

export const loginLocators = (page: Page) => ({
  emailInput: page.locator('[name="email"]'),
  passwordInput: page.locator('[name="password"]'),
  loginButton: page.getByRole("button", { name: "Log In" }),
  welcomeMessage: page.getByText(/^Welcome, .+$/),
  logoutButton: page.getByRole("button", { name: "Logout" }),
  errorMessage: page.locator("p[role='alert']"),
});
