import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { loginUsers, users, messages } from "../../fixtures/testData";
import { loginLocators } from "@/pages/locators";

test.describe("Login Functionality Testing", () => {
  for (const user of loginUsers) {
    test(`Login positive scenario - ${user.role}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.login(user.email, user.password);

      await page.waitForURL(user.url, { timeout: 5000 });

      const welcomeText = await loginPage.getWelcomeText();

      expect(welcomeText).toBe(user.welcomeMessage);

      await loginPage.logout();
    });
  }

  test("Login negative scenario - Invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(users.invalidUser.email, users.invalidUser.password);

    const errorMessage = await loginLocators(page).errorMessage.innerText();
    console.log("Error Message:", errorMessage);
    expect(errorMessage).toBe(messages.invalidCredentials);
  });
});
