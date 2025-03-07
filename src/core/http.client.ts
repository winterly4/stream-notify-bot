import { injectable, inject } from "inversify";
import retry from "async-retry";
import { OAuth2Service } from "./oauth2/oauth2.service";
import { Logger } from "./logger";

@injectable()
export class HttpClient {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(OAuth2Service) private oauthService: OAuth2Service
  ) {}

  async requestOauth2(url: string) {
    return retry(
      async () => {
        const token = await this.oauthService.getAccessToken();
        const response = await fetch(url, {
          headers: {
            "Client-ID": "wmuq5t1s5xu7yvgj4gf9cuof1bix5i",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          this.oauthService.refreshToken();
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      },
      {
        retries: 3,
        onRetry: (error) => {
          this.logger.log(`Retrying request`, {
            error: error.message,
          });
        },
      }
    );
  }

  async request(url: string) {
    return retry(
      async () => {
        const token = await this.oauthService.getAccessToken();
        const response = await fetch(url, {
          headers: {
            "Client-ID": "wmuq5t1s5xu7yvgj4gf9cuof1bix5i",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          this.oauthService.refreshToken();
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      },
      {
        retries: 3,
        onRetry: (error) => {
          this.logger.log(`Retrying request`, {
            error: error.message,
          });
        },
      }
    );
  }
}
