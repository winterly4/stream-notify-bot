import dotenv from "dotenv";
import path from "path";

type EnvMode = "development" | "production" | "test";

class ConfigService {
  private static instance: ConfigService;
  private envPath: string;

  private constructor(mode: EnvMode = "development") {
    this.envPath = path.resolve(process.cwd(), `.env.${mode}.local`);
    dotenv.config({ path: this.envPath });
  }

  static getInstance(mode?: EnvMode): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService(mode);
    }
    return ConfigService.instance;
  }

  get(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Missing env variable: ${key}`);
    return value;
  }
}

export default ConfigService;
