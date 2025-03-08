import fs from "fs/promises";
import { injectable } from "inversify";
import path from "path";

@injectable()
export class Storage<T = any> {
  private readonly filePath: string;

  constructor(fileName: string = "stream_state.json") {
    this.filePath = path.resolve(process.cwd(), fileName);
  }

  async save(key: string, data: T): Promise<void> {
    try {
      let currentData: Record<string, T> = {};
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

  async load(key: string): Promise<T | null> {
    try {
      const fileContent = await fs.readFile(this.filePath, "utf-8");
      const data: Record<string, T> = JSON.parse(fileContent);

      return data[key] || null;
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("Файл не найден, возвращаем null.");
      }
      console.error("Ошибка при загрузке состояния:", error);
      throw error;
    }
  }
}
