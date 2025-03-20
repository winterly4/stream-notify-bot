import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type Data = {
  [key: string]: any;
};

export class DBService {
  private db: Low<Data>;

  constructor(filename: string) {
    const adapter = new JSONFile<Data>(filename);
    this.db = new Low(adapter, {});
    this.init();
  }

  private async init() {
    await this.db.read();
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.db.data[key];
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.db.update((data) => {
      data[key] = value;
    });
  }

  async update<T>(key: string, updater: (data: T) => T): Promise<void> {
    await this.db.update((data) => {
      if (data[key]) {
        data[key] = updater(data[key]);
      }
    });
  }

  async delete(key: string): Promise<void> {
    await this.db.update((data) => {
      delete data[key];
    });
  }
}
