import { inject, injectable } from "inversify";
import { ITwitchService, StreamsUserResponse } from "./twitch.interface";
import { HttpClient } from "../../../core/http.client";

@injectable()
export class TwitchService implements ITwitchService {
  constructor(@inject(HttpClient) private httpClient: HttpClient) {}

  async getStreamInfoByChannel(channel: string): Promise<StreamsUserResponse> {
    try {
      const result = await this.httpClient.requestOauth2(
        `https://api.twitch.tv/helix/streams?user_login=${channel}`
      );
      return result;
    } catch (error) {
      console.error("Ошибка при отправке API запроса", error);
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
      console.error("Ошибка при отправке API запроса", error);
      throw new Error("Failed to fetch stream info");
    }
  }
}
