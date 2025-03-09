import { Logger } from "../core/logger";
import { Storage } from "../core/storage";
import { StorageService } from "../modules/storage/storage.service";

const storageService = new StorageService(new Storage(new Logger()));
const logger = new Logger();

async function testStorage() {
  try {
    // await storageService.updateLastDate();

    const result = await storageService.getLastDate();

    logger.log("Результат:", result);
  } catch (error) {
    logger.error("Ошибка при работе с хранилищем:", error);
  }
}

testStorage();
