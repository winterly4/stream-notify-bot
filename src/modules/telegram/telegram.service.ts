import { inject, injectable } from "inversify";

interface ITelegramService {
  sendNotification(message: string);
}

@injectable()
export class TelegramService implements ITelegramService {
  sendNotification(message: string) {
    console.log("сообщение в тг отправлено");
  }
}
