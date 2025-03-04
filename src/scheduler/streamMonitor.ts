import { StorageController } from "../services/storage/storage.controller";
import { StreamState } from "../services/storage/storage.service";
import { TwitchService } from "../services/stream/twitch/twitch.service";

export class StreamMonitor {
  constructor(
    private twitchService: TwitchService,
    private storageController: StorageController,
    private channel: string
  ) {}

  async checkStream(): Promise<void> {
    const streamInfo = await this.twitchService.getStreamInfoByLogin(
      this.channel
    );

    if (streamInfo) {
      const currentState: StreamState = {
        status: "Live",
        date: new Date(),
      };
      await this.storageController.updateState(currentState);
      console.log("Стрим онлайн. Состояние обновлено.");
    } else {
      const currentState: StreamState = {
        status: "Offline",
        date: new Date(),
      };
      await this.storageController.updateState(currentState);
      console.log("Стрим оффлайн. Состояние обновлено.");
    }
  }
}
