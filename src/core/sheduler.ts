import { injectable, inject } from "inversify";
import cron from "node-cron";
import { Logger } from "./logger";

@injectable()
export class Scheduler {
  private jobs: cron.ScheduledTask[] = [];

  constructor(@inject(Logger) private logger: Logger) {}

  schedule(task: () => Promise<void>, cronExpression: string) {
    const job = cron.schedule(cronExpression, async () => {
      try {
        await task();
      } catch (error) {
        this.logger.error("Scheduled task failed", error);
      }
    });

    this.jobs.push(job);
    return job;
  }

  shutdown() {
    this.jobs.forEach((job) => job.stop());
    this.logger.log("Scheduler stopped");
  }
}
