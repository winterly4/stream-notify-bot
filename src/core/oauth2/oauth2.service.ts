import { injectable } from "inversify";
import { config } from "../config";

export interface IOAuth2Service {
  getAccessToken(): string;
  refreshToken();
}

@injectable()
export class OAuth2Service implements IOAuth2Service {
  private accessToken: string;

  constructor(
    private clientId: string,
    private clientSecret: string,
    private accessTokenURL: string
  ) {}

  getAccessToken() {
    if (config.twitch.accessToken === undefined) {
      this.refreshToken();
    } else {
      this.accessToken = config.twitch.accessToken;
    }

    return this.accessToken;
  }

  async refreshToken() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });

    try {
      const response = await fetch(this.accessTokenURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
      });

      if (!response.ok) throw new Error(`Ошибка запроса ${response.status}`);

      const data = await response.json();

      if (data !== null) {
        this.accessToken = data.access_token;
      }
    } catch (error) {
      console.error("Ошибка при получении токена", error);
    }
  }
}
