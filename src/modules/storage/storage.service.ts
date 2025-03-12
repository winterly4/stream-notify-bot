import { inject, injectable } from "inversify";
import { Storage } from "../../core/storage";
import { config } from "../../core/config";
import { Logger } from "../../core/logger";

export type StreamState = {
  lastChecked: number | null;
};

@injectable()
export class StorageService {
  private cacheJson: StreamState = null;
  private channel: string = config.twitch.channel;

  constructor(
    @inject(Storage) private storage: Storage,
    @inject(Logger) private logger: Logger
  ) {}

  private async save(value: StreamState): Promise<void> {
    await this.storage.save(this.channel, value);
  }

  private async load(): Promise<StreamState> {
    return await this.storage.load(this.channel);
  }

  public async getChannelStorageData(): Promise<StreamState | null> {
    if (!this.cacheJson) {
      this.logger.log("Кеш не найден, получаем значение из файла");
      const result = (this.cacheJson = await this.load());
      if (!result) {
        this.initChannelStorageDate();
      }
    }
    return this.cacheJson;
  }

  private async initChannelStorageDate() {
    this.cacheJson = { lastChecked: 0 };
    this.save(this.cacheJson);
  }

  public async updateChannelStorageData(): Promise<void> {
    this.cacheJson = { lastChecked: Date.now() };
    this.save(this.cacheJson);
  }

  // public setChannel(channel: string) {
  //   this.channel = channel;
  // }
}
