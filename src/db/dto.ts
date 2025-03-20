export type UserDto = {
  telegramChatId: string;
  telegramChannelId: string;
  lastNotify: number;
  twitchChannel: string;
};

export type AppDto = {
  TWITCH_ACCESS_TOKEN: string;
};
