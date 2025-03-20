// import { Logger } from "../core/logger";
// import { Storage } from "../core/storage";
// import { StorageService } from "../modules/storage/storage.service";

// const storageService = new StorageService(
//   new Storage(new Logger()),
//   new Logger()
// );
// const logger = new Logger();

// async function testStorage() {
//   try {
//     // await storageService.updateChannelStorage();

//     const result = await storageService.getChannelStorageData();

//     if (result) {
//       logger.log(`Результат: ${result.lastChecked}`);
//     } else {
//       logger.log("Результат: null");
//     }
//   } catch (error) {
//     logger.error("Ошибка при работе с хранилищем:", error);
//   }
// }

// testStorage();
