import { inject, injectable } from "inversify";

@injectable()
export class StorageService {
  constructor(@inject(Storage) private storage: Storage) {}

  async update(key: string, value: string): Promise<void> {
    console.log("состояние сохранено");
    // await this.storage.save(key, value);
  }

  async get(key: string): Promise<string> {
    console.log("состояние получено");
    return "";
    // return this.storage.load(key);
  }
}
