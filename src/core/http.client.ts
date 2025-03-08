import { injectable, inject } from "inversify";
import retry from "async-retry";
import { OAuth2 } from "./oauth2";
import { Logger } from "./logger";
import { config } from "./config";

@injectable()
export class HttpClient {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(OAuth2) private oauth: OAuth2
  ) {}

  async requestOauth2(url: string) {
    return retry(
      async () => {
        const token = await this.oauth.getAccessToken();
        const response = await fetch(url, {
          headers: {
            "Client-ID": config.twitch.clientId,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          this.oauth.refreshToken();
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      },
      {
        retries: 5,
        onRetry: (error) => {
          this.logger.log(`Retrying request`, {
            error: error,
          });
        },
      }
    );
  }
}
