# Stream Notify Bot

Stream Notify Bot — это приложение на Node.js, предназначенное для отслеживания статуса стримов на Twitch и отправки уведомлений в Telegram, когда стример начинает трансляцию.

---

## Основные функции

- **Отслеживание стримов**: Регулярно проверяет статус стрима на Twitch по указанному каналу.
- **Уведомления в Telegram**: Отправляет сообщение в Telegram-чат, как только стрим начинается.
- **Планировщик задач**: Использует `node-cron` для периодической проверки статуса стрима.
- **Кеширование данных**: Сохраняет время последней проверки в формате JSON (`storage.json`), чтобы избежать частых уведомлений.
- **Конфигурация через .env**: Все настройки (токены, ID каналов и т.д.) задаются через переменные окружения.

---

## Запуск

1. Создайте Telegram-бота с помощью `BotFather` и получите токен.
2. Зарегистрируйте приложение на [Twitch Developer Console](https://dev.twitch.tv/console/apps) и получите `Client ID` и `Client Secret`.
3. Создайте .env.production.local

```
# Twitch
TWITCH_CLIENT_ID=your_twitch_client_id
TWITCH_CLIENT_SECRET=your_twitch_client_secret
TWITCH_API_URL=https://api.twitch.tv/helix
TWITCH_STREAMS_CHANNEL=your_twitch_channel_name

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# App
STREAM_DELAY=8 # Задержка между уведомлениями (в часах)
STORAGE_FILE_NAME=stream_state.json
```

4. Запустить docker_init.sh
