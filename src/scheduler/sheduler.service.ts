export class SchedulerService {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;

  constructor(
    private task: () => Promise<void>,
    private interval: number = 60 * 1000
  ) {}

  start(): void {
    if (this.isRunning) {
      console.warn("Планировщик уже запущен.");
      return;
    }

    this.isRunning = true;
    console.log("Планировщик запущен.");

    this.executeTask();

    this.intervalId = setInterval(() => this.executeTask(), this.interval);
  }

  stop(): void {
    if (!this.isRunning || !this.intervalId) {
      console.warn("Планировщик уже остановлен.");
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isRunning = false;
    console.log("Планировщик остановлен.");
  }

  private async executeTask(): Promise<void> {
    try {
      await this.task();
    } catch (error) {
      console.error("Ошибка при выполнении задачи:", error);
    }
  }
}
