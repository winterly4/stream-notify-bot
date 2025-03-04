import { IOAuth2Service } from "../../oauth2/oauth2.service";

export class TwitchApiClient {
  constructor(
    private readonly oauthService: IOAuth2Service,
    private readonly clientId: string = ""
  ) {}

  async fetchWithAuth(url: string): Promise<any> {
    const token = await this.oauthService.getAccessToken();

    const response = await fetch(url, {
      headers: {
        "Client-ID": this.clientId,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      await this.oauthService.refreshToken();
      return this.fetchWithAuth(url);
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }
}
