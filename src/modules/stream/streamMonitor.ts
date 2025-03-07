import { injectable, inject } from "inversify";
import { Logger } from "../../core/logger";
import { TwitchService } from "./twitch/twitch.service";
import { Storage } from "../../core/storage";
import { TelegramService } from "../telegram/telegram.service";

@injectable()
export class StreamMonitorTask {
  constructor(
    @inject(Logger) private logger: Logger,
    @inject(TwitchService) private twitchService: TwitchService,
    @inject(Storage) private storage: Storage,
    @inject(TelegramService) private telegramService: TelegramService
  ) {}

  async execute(channel: string) {
    try {
      // const status = this.storage.load(channel);
      // const {} = status;

      const result = await this.twitchService.getStreamInfoByChannel(channel);

      if (result.data && result.data.length > 0) {
        const streamInfo = result.data[0];

        const message =
          `🔥 Стрим уже начался!\n` +
          `🎯 Тема: ${streamInfo.title}\n` +
          `🎮 Играем в ${streamInfo.game_name}\n` +
          `________________________________\n` +
          `Где смотреть:\n` +
          `[Twitch](https://twitch.tv/relka_art) ` +
          `[VK Play](https://live.vkvideo.ru/relka_art) ` +
          `[Trovo](https://trovo.live/s/relka_art)`;

        this.telegramService.sendNotification(message);

        await this.storage.save(channel, {
          status: "Live",
          tgNotify: true,
          lastChecked: new Date(),
        });
      }

      this.logger.log(`Stream status updated:`);
    } catch (error) {
      this.logger.error("Failed to check stream status", error);
      throw error;
    }
  }
}
