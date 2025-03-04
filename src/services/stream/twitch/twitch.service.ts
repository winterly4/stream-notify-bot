import { IOAuth2Service } from "../../oauth2/oauth2.service";
import { TwitchApiClient } from "./twitch.api";

export class TwitchService implements ITwitchService {
  private twitchApiClient: TwitchApiClient;
  constructor(oauthService: IOAuth2Service) {
    this.twitchApiClient = new TwitchApiClient(oauthService);
  }

  async getStreamInfoByLogin(
    channel: string
  ): Promise<StreamsUserResponse | null> {
    try {
      const result = await this.twitchApiClient.fetchWithAuth(
        `https://api.twitch.tv/helix/streams?user_login=${channel}`
      );
      return result;
    } catch (error) {
      console.error("Ошибка при отправке API запроса", error);
      return null;
    }
  }

  async getStreamLiveChannel(): Promise<StreamsUserResponse | null> {
    try {
      const result = await this.twitchApiClient.fetchWithAuth(
        "https://api.twitch.tv/helix/streams?type=live&first=1"
      );
      return result;
    } catch (error) {
      console.error("Ошибка при отправке API запроса", error);
      return null;
    }
  }
}
