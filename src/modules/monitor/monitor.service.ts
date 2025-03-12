import { injectable, inject } from "inversify";
import { Logger } from "../../core/logger";
import { TelegramService } from "../telegram/telegram.service";
import { StorageService } from "../storage/storage.service";
import { config } from "../../core/config";
import { StreamsUserResponse } from "../twitch/twitch.interface";
import { TwitchService } from "../twitch/twitch.service";

@injectable()
export class MonitorService {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(TwitchService) private twitchService: TwitchService,
    @inject(StorageService) private storageService: StorageService,
    @inject(TelegramService) private telegramService: TelegramService
  ) {}

  async execute(channel: string) {
    try {
      const channelStorage = await this.storageService.getChannelStorageData();

      if (
        channelStorage &&
        Date.now() - channelStorage.lastChecked < config.app.streamDelay
      ) {
        this.logger.log(
          `Дата отправки сообщения: ${new Date(
            channelStorage.lastChecked
          ).toLocaleString()}` +
            ` Текущая дата: ${new Date().toLocaleString()}` +
            ` Отправка возобновится в ${new Date(
              channelStorage.lastChecked + config.app.streamDelay
            ).toLocaleString()}`
        );
        return;
      }

      this.logger.log("Запрашиваем состояние стрима");

      let result: StreamsUserResponse;

      try {
        result = await this.twitchService.getStreamInfoByChannel(channel);
      } catch (error) {
        this.logger.error("Failed to fetch stream info from Twitch", error);
        return;
      }

      if (result.data && result.data.length > 0) {
        const streamInfo = result.data[0];

        try {
          await this.telegramService
            .createStreamMessage(streamInfo)
            .sendNotification();
          this.storageService.updateChannelStorageData();
          this.logger.log(`Stream status updated:`);
        } catch (error) {
          this.logger.error("Failed to send Telegram notification", error);
          return;
        }
      }
    } catch (error) {
      this.logger.error("Failed to check stream status", error);
      throw error;
    }
  }
}
