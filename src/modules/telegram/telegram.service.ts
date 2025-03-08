import { inject, injectable } from "inversify";
import TelegramBot from "node-telegram-bot-api";
import { config } from "../../core/config";
import retry from "async-retry";
import { Logger } from "../../core/logger";
import { StreamInfo } from "../stream/twitch/twitch.interface";

@injectable()
export class TelegramService {
  private bot: TelegramBot;
  private message: string = null;

  constructor(@inject(Logger) private logger: Logger) {
    this.bot = new TelegramBot(config.telegram.botToken, { polling: false });
  }

  async sendNotification(): Promise<void> {
    if (!this.message) {
      throw new Error(
        "Сообщение не было создано. Сначала вызовите createStreamMessage."
      );
    }
    await retry(
      async (bail) => {
        try {
          const sentMessage = await this.bot.sendMessage(
            config.telegram.chatId,
            this.message,
            { parse_mode: "Markdown", disable_web_page_preview: true }
          );
          this.logger.log(
            "Сообщение в Telegram отправлено.",
            sentMessage.message_id
          );
        } catch (error) {
          this.logger.error("Ошибка при отправке сообщения в Telegram:", error);
          if (error.code === 403) {
            // Если ошибка фатальная (например, бот заблокирован), прекращаем попытки
            bail(error);
            return;
          }
          // В противном случае пробуем ещё раз
          throw error;
        }
      },
      {
        retries: 5,
        minTimeout: 1000,
        maxTimeout: 5000,
      }
    );
  }

  public createStreamMessage(streamInfo: StreamInfo): this {
    this.message =
      `🔥 Стрим уже начался!\n` +
      `🎯 Тема: ${streamInfo.title}\n` +
      `🎮 Играем в ${streamInfo.game_name}\n` +
      `________________________________\n` +
      `Где смотреть:\n` +
      `[Twitch](https://twitch.tv/relka_art) ` +
      `[VK Play](https://live.vkvideo.ru/relka_art) ` +
      `[Trovo](https://trovo.live/s/relka_art)`;
    return this;
  }
}
