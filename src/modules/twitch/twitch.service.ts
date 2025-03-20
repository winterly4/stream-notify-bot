import { inject, injectable } from "inversify";
import { HttpClient } from "../../core/http.client";
import { StreamsUserResponse } from "./dto";
import { Logger } from "../../core/logger";

export interface ITwitchService {
  getStreamInfoByChannel(channel: string): Promise<StreamsUserResponse | null>;
  getStreamLiveChannel(): Promise<StreamsUserResponse | null>;
}

@injectable()
export class TwitchService implements ITwitchService {
  constructor(
    @inject(HttpClient) private httpClient: HttpClient,
    @inject(Logger) private logger: Logger
  ) {}

  async getStreamInfoByChannel(channel: string): Promise<StreamsUserResponse> {
    try {
      const result = await this.httpClient.requestOauth2(
        `https://api.twitch.tv/helix/streams?user_login=${channel}`
      );
      return result;
    } catch (error) {
      this.logger.error("Ошибка при отправке API запроса", error);
      throw new Error("Failed to fetch stream info");
    }
  }

  async getStreamLiveChannel(): Promise<StreamsUserResponse> {
    try {
      const result = await this.httpClient.requestOauth2(
        "https://api.twitch.tv/helix/streams?type=live&first=1"
      );
      return result;
    } catch (error) {
      this.logger.error("Ошибка при отправке API запроса", error);
      throw new Error("Failed to fetch stream info");
    }
  }
}
