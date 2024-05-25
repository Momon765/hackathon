class SlackNotifier
  attr_reader :client

  # 環境SLACK_WEBHOOK_URLにwebhook urlを格納
  WEBHOOK_URL = ENV['SLACK_WEBHOOK_URL']
  CHANNEL = "#ランチ速報"
  USER_NAME = "ランチ速報bot"

  def initialize(channel: CHANNEL, username: USER_NAME)
    @client = Slack::Notifier.new(WEBHOOK_URL, channel: CHANNEL, username: USER_NAME)
  end

  def send(message, title)
    payload = {
      # fallback: "Application raise error",
      text: message,
      color: "green"
    }

    client.post(text: title, attachments: [payload])
  end
end
