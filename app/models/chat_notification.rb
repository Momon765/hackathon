# frozen_string_literal: true

class ChatNotification
  # @param [Slack::Web::Client] client
  def initialize(client: Slack::Web::Client.new)
    @client = client
  end

  # DMを送る際には、channelにユーザーのIDを指定する

  # 汎用通知
  # @param [String] message
  # @param [String, nil] channel
  def notice(message, channel = nil)
    post_message(attachments: attachments(message), channel: channel)
  end

  # attachmentsを指定して通知
  def notice_message(attachments, channel = nil)
    post_message(attachments: attachments, channel: channel)
  end

  private

  # 送信処理
  # @param [Array] attachments
  # @param [String] channel
  def post_message(attachments: [], channel: '')
    channel = actual_channel(channel)
    @client.chat_postMessage(text: '', attachments: attachments, channel: channel)
  rescue => e
    Rails.logger.error(e)
  end

  # @param [String] channel
  def actual_channel(channel)
    channel.presence || ENV.fetch('SLACK_DEFAULT_CHANNEL')
  end

  # 通知の形式
  def attachments(message)
    [{ text: message }]
  end
end
