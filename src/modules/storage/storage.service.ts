import { inject, injectable } from "inversify";
import { Storage } from "../../core/storage";

export type StreamState = {
  lastChecked: number | null;
};

@injectable()
export class StorageService {
  private cacheJson: StreamState = null;
  private channel: string = null;

  constructor(@inject(Storage) private storage: Storage) {}

  private async update(value: StreamState): Promise<void> {
    await this.storage.save(this.channel, value);
  }

  private async get(): Promise<StreamState> {
    return await this.storage.load(this.channel);
  }

  public async getLastDate(): Promise<StreamState> {
    if (!this.cacheJson) {
      this.cacheJson = await this.get();
    }
    return this.cacheJson;
  }

  public async updateLastDate(): Promise<void> {
    this.cacheJson = { lastChecked: Date.now() };
    this.update(this.cacheJson);
  }

  public setChannel(channel: string) {
    this.channel = channel;
  }
}
