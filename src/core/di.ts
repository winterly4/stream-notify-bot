import { Container } from "inversify";
import { Logger } from "./logger";
import { HttpClient } from "./http.client";
import { Scheduler } from "./sheduler";
import { TelegramService } from "../modules/telegram/telegram.service";
import { StorageService } from "../modules/storage/storage.service";
import { Storage } from "./storage";
import { MonitorService } from "../modules/monitor/monitor.service";
import { OAuth2 } from "./oauth2";
import { TwitchService } from "../modules/twitch/twitch.service";

const container = new Container();

container.bind(Logger).toSelf().inSingletonScope();
container.bind(HttpClient).toSelf().inSingletonScope();
container.bind(Storage).toSelf().inSingletonScope();
container.bind(Scheduler).toSelf().inSingletonScope();
container.bind(TwitchService).toSelf().inSingletonScope();
container.bind(TelegramService).toSelf().inSingletonScope();
container.bind(StorageService).toSelf().inSingletonScope();
container.bind(MonitorService).toSelf().inSingletonScope();
container.bind(OAuth2).toSelf().inSingletonScope();

export { container };
