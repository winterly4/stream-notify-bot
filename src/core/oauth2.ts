import { inject, injectable } from "inversify";
import { config } from "./config";
import { Logger } from "./logger";

@injectable()
export class OAuth2 {
  private accessToken: string;

  constructor(
    @inject(Logger) private logger: Logger,
    private clientId: string = config.twitch.clientId,
    private clientSecret: string = config.twitch.clientSecret,
    private accessTokenURL: string = config.twitch.accessToken
  ) {
    if (config.twitch.accessToken === undefined) {
      this.refreshToken();
    } else {
      this.accessToken = config.twitch.accessToken;
    }
  }

  getAccessToken() {
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
      this.logger.error("Ошибка при получении токена", error);
    }
  }
}
