import { config } from "../core/config";
import { SchedulerService } from "../scheduler/sheduler.service";
import { StreamMonitor } from "../scheduler/streamMonitor";
import { OAuth2Service } from "../services/oauth2/oauth2.service";
import { StorageController } from "../services/storage/storage.controller";
import { StorageSercive } from "../services/storage/storage.service";
import { TwitchService } from "../services/stream/twitch/twitch.service";

const oauthService = new OAuth2Service(
  config.twitch.clientId!,
  config.twitch.clientSecret!,
  config.twitch.tokenUrl!
);

const twitchService = new TwitchService(oauthService);
const storageService = new StorageSercive();
const storageController = new StorageController(storageService, "relka_art");

const streamMonitor = new StreamMonitor(
  twitchService,
  storageController,
  "relka_art"
);

const scheduler = new SchedulerService(() => streamMonitor.checkStream());

scheduler.start();

process.on("SIGINT", () => {
  scheduler.stop();
  process.exit();
});
