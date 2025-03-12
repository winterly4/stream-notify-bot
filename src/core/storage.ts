import fs from "fs/promises";
import { inject, injectable } from "inversify";
import path from "path";
import { Logger } from "./logger";
import { config } from "./config";

@injectable()
export class Storage<T = any> {
  private readonly filePath: string;

  constructor(
    @inject(Logger) private logger: Logger,
    fileName: string = config.app.storageFileName
  ) {
    this.filePath = path.resolve(process.cwd(), fileName);
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(this.filePath, JSON.stringify({}), "utf-8");
        this.logger.log(`Файл ${this.filePath} создан.`);
      } else {
        throw error;
      }
    }
  }

  async save(key: string, data: T): Promise<void> {
    try {
      let currentData: Record<string, T> = {};
      try {
        const fileContent = await fs.readFile(this.filePath, "utf-8");
        currentData = JSON.parse(fileContent);
      } catch (error) {
        if (error.code === "ENOENT") {
          this.logger.error("Файл не найден, создаём новый...", error);
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
      this.logger.log(`Состояние для канала ${key} успешно сохранено.`);
    } catch (error) {
      this.logger.error("Ошибка при сохранении состояния:", error);
      throw error;
    }
  }

  async load(key: string): Promise<T | null> {
    try {
      await this.ensureFileExists();

      const fileContent = await fs.readFile(this.filePath, "utf-8");
      const data: Record<string, T> = JSON.parse(fileContent);

      return data[key] || null;
    } catch (error) {
      this.logger.error("Ошибка при загрузке состояния:", error);
      throw error;
    }
  }
}
