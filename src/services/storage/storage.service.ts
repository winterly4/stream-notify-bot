interface IStorage {
  save(key: string, data: any): Promise<void>;
  load(channel: string): Promise<StreamState | null>;
}
// export type StreamState = "live" | "offline";

export type StreamState = {
  channel: string;
  status: "Live" | "Offline";
  date: Date | null;
};

export class StreamStateManager {
  constructor(private storage: IStorage, private channel: string) {}

  async updateState(state: StreamState): Promise<void> {
    await this.storage.save(this.channel, state);
  }

  async getLastState(): Promise<StreamState | null> {
    return this.storage.load(this.channel);
  }
}

// Реализация для файлового хранилища
export class FileStorage implements IStorage {
  async save(key: string, data: any): Promise<void> {
    // Реализация записи в файл
  }
  async load(channel: string): Promise<StreamState | null> {
    return {
      channel: "relka_art",
      status: "Live",
      date: null,
    };
  }
}
