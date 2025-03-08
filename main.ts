import "reflect-metadata";
import { container } from "./src/core/di";
import { Scheduler } from "./src/core/sheduler";
import { StreamMonitor } from "./src/modules/stream/streamMonitor";
import { Logger } from "./src/core/logger";
import { config } from "./src/core/config";

async function bootstrap() {
  const scheduler = container.get(Scheduler);
  const monitor = container.get(StreamMonitor);

  scheduler.schedule(
    () => monitor.execute(config.twitch.channel),
    "* * * * * *"
  );

  process.on("SIGINT", () => {
    scheduler.shutdown();
    process.exit();
  });
}

bootstrap().catch((error) => {
  container.get<Logger>(Logger).error("failed", error);
  process.exit();
});
