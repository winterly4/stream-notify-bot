mkdir -p ~/stream-notify-bot
cd ~/stream-notify-bot
docker build -t stream-notify-bot-image .

docker run -d --name stream-notify-bot-container \
  -v $HOME/stream-notify-bot:/app \
  -w /app \
  --restart always \
  stream-notify-bot-image

