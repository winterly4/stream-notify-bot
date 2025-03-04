import { IStorage, StreamState } from "./storage.service";

export class StorageController {
  constructor(private storage: IStorage, private channel: string) {}

  async updateState(state: StreamState): Promise<void> {
    await this.storage.save(this.channel, state);
  }

  async getLastState(): Promise<StreamState | null> {
    return this.storage.load(this.channel);
  }
}
