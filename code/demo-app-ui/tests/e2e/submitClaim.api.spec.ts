import { expect, test } from "@playwright/test";
import { ClaimsApi } from "../../api/claimsApi";
import { claimTestData, users } from "../../fixtures/testData";

test.describe("Claims API", () => {
  test("submit a new claim through the API", async ({ page }) => {
    const claimsApi = new ClaimsApi(page.request, page.context());

    const loginResponse = await claimsApi.login(
      users.claimantUser.email,
      users.claimantUser.password,
    );
    expect(loginResponse.status()).toBe(200);

    const response = await claimsApi.submitClaim(claimTestData);

    const responseBody = await response.json();

    console.log("Claim submission API response:", responseBody);

    expect(response.status()).toBe(201);
    expect(responseBody).toHaveProperty("claimId");
    expect(responseBody.description).toBe(claimTestData.description);
    expect(responseBody.claimAmount).toBe(claimTestData.claimAmount);
    expect(responseBody.status).toBe("SUBMITTED");
  });
});
