import "reflect-metadata";
import { container } from "./src/core/di";
import { Scheduler } from "./src/core/sheduler";
import { MonitorService } from "./src/modules/monitor/monitor.service";
import { Logger } from "./src/core/logger";
import { config } from "./src/core/config";

async function bootstrap() {
  console.log(
    `Скрипт запущен в режиме ${config.mode}\n` +
      `Следим за стримером: ${config.twitch.channel}`
  );

  const scheduler = container.get(Scheduler);
  const monitor = container.get(MonitorService);

  scheduler.schedule(() => monitor.execute(config.twitch.channel), "* * * * *");

  process.on("SIGINT", () => {
    scheduler.shutdown();
    process.exit();
  });
}

bootstrap().catch((error) => {
  container.get<Logger>(Logger).error("failed", error);
  process.exit();
});
