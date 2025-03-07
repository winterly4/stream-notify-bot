import "reflect-metadata";
import { container } from "./src/core/di";
import { Scheduler } from "./src/core/sheduler";
import { StreamMonitorTask } from "./src/modules/stream/streamMonitor";
import { Logger } from "./src/core/logger";

async function bootstrap() {
  const scheduler = container.get(Scheduler);
  const monitor = container.get(StreamMonitorTask);

  scheduler.schedule(() => monitor.execute("realsheeshed"), "* * * * *");

  process.on("SIGINT", () => {
    scheduler.shutdown();
    process.exit();
  });
}

bootstrap().catch((error) => {
  container.get<Logger>(Logger).error("failed", error);
  process.exit();
});
