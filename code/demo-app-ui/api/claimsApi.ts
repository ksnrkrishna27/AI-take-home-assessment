import {
  APIRequestContext,
  APIResponse,
  BrowserContext,
} from "@playwright/test";

export interface ClaimRequest {
  incidentDate: string;
  incidentLocation: string;
  description: string;
  claimAmount: number;
}

export class ClaimsApi {
  private readonly baseUrl = "http://localhost:8090";

  constructor(
    private readonly request: APIRequestContext,
    private readonly context: BrowserContext,
  ) {}

  async login(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/api/auth/login`, {
      data: { email, password },
    });
  }

  async submitClaim(claim: ClaimRequest): Promise<APIResponse> {
    const cookies = await this.context.cookies();
    const csrfCookie = cookies.find((cookie) => cookie.name === "XSRF-TOKEN");

    return this.request.post(`${this.baseUrl}/api/claims`, {
      data: claim,
      headers: csrfCookie
        ? { "X-XSRF-TOKEN": decodeURIComponent(csrfCookie.value) }
        : undefined,
    });
  }
}
