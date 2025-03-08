import { Container } from "inversify";
import { Logger } from "./logger";
import { HttpClient } from "./http.client";
import { Scheduler } from "./sheduler";
import { TwitchService } from "../modules/stream/twitch/twitch.service";
import { TelegramService } from "../modules/telegram/telegram.service";
import { StorageService } from "../modules/storage/storage.service";
import { Storage } from "./storage";
import { StreamMonitor } from "../modules/stream/streamMonitor";
import { OAuth2 } from "./oauth2";

const container = new Container();

container.bind(Logger).toSelf().inSingletonScope();
container.bind(HttpClient).toSelf().inSingletonScope();
container.bind(Storage).toSelf().inSingletonScope();
container.bind(Scheduler).toSelf().inSingletonScope();
container.bind(TwitchService).toSelf().inSingletonScope();
container.bind(TelegramService).toSelf().inSingletonScope();
container.bind(StorageService).toSelf().inSingletonScope();
container.bind(StreamMonitor).toSelf().inSingletonScope();
container.bind(OAuth2).toSelf().inSingletonScope();

export { container };
