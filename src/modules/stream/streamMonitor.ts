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

      const data = await this.twitchService.getStreamInfoByChannel(channel);

      if (data?.data?.length > 0) {
        this.telegramService.sendNotification("message");

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
