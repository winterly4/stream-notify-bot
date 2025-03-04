import fs from "fs/promises";
import path from "path";

export type StreamState = {
  channel: string;
  status: "Live" | "Offline";
  date: Date | null;
};

export interface IStorage {
  save(key: string, data: any): Promise<void>;
  load(channel: string): Promise<StreamState | null>;
}

export class StorageSercive implements IStorage {
  private readonly filePath: string;

  constructor(fileName: string = "stream_state.json") {
    this.filePath = path.resolve(process.cwd(), fileName);
  }

  async save(key: string, data: StreamState): Promise<void> {
    try {
      let currentData: Record<string, StreamState> = {};
      try {
        const fileContent = await fs.readFile(this.filePath, "utf-8");
        currentData = JSON.parse(fileContent);
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log("Файл не найден, создаём новый...");
        } else {
          throw error;
        }
      }

      currentData[key] = data;

      await fs.writeFile(
        this.filePath,
        JSON.stringify(currentData, null, 2),
        "utf-8"
      );
      console.log(`Состояние для канала ${key} успешно сохранено.`);
    } catch (error) {
      console.error("Ошибка при сохранении состояния:", error);
      throw error;
    }
  }

  async load(channel: string): Promise<StreamState | null> {
    try {
      const fileContent = await fs.readFile(this.filePath, "utf-8");
      const data: Record<string, StreamState> = JSON.parse(fileContent);

      return data[channel] || null;
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("Файл не найден, возвращаем null.");
        return null;
      }
      console.error("Ошибка при загрузке состояния:", error);
      throw error;
    }
  }
}
