import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";

const envPath = path.resolve(process.cwd(), `.env.${env}.local`);
dotenv.config({ path: envPath });

export const config = {
  mode: env,
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    apiUrl: process.env.TWITCH_API_URL,
    accessToken: process.env.TWITCH_ACCESS_TOKEN,
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
};

const requiredEnvVars = [
  "TWITCH_CLIENT_ID",
  "TWITCH_CLIENT_SECRET",
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_CHAT_ID",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
