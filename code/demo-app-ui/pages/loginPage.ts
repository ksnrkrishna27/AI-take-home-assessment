import { Page } from "@playwright/test";
import { loginLocators } from "./locators";

export class LoginPage {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  async login(email: string, password: string) {
    await this.page.goto("/login");
    await loginLocators(this.page).emailInput.fill(email);
    await loginLocators(this.page).passwordInput.fill(password);
    await loginLocators(this.page).loginButton.click();
  }

  async getWelcomeText(): Promise<string> {
    return await loginLocators(this.page).welcomeMessage.innerText();
  }

  async logout() {
    await loginLocators(this.page).logoutButton.click();
  }
}
