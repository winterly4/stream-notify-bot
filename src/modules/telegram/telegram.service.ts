import { inject, injectable } from "inversify";
import TelegramBot from "node-telegram-bot-api";
import { config } from "../../core/config";
import retry from "async-retry";
import { Logger } from "../../core/logger";

interface ITelegramService {
  sendNotification(message: string);
}

@injectable()
export class TelegramService implements ITelegramService {
  private bot: TelegramBot;

  constructor(@inject(Logger) private logger: Logger) {
    this.bot = new TelegramBot(config.telegram.botToken, { polling: false });
  }

  async sendNotification(message: string): Promise<void> {
    await retry(
      async (bail) => {
        try {
          const sentMessage = await this.bot.sendMessage(
            config.telegram.chatId,
            message,
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
}
