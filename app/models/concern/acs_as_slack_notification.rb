# frozen_string_literal: true

module ActsAsSlackNotification
  extend ActiveSupport::Concern

  class_methods do
    delegate :notice, to: :new
    delegate :notice_message, to: :new
  end

  # @param [Slack::Web::Client] client
  def initialize(client: Slack::Web::Client.new)
    @client = client
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

  # 本番環境でない場合は特定のチャンネルに通知する
  # @param [String] channel
  def actual_channel(channel)
    return ENV.fetch('SLACK_DEFAULT_CHANNEL') unless Rails.env.production?

    channel.presence || ENV.fetch('SLACK_DEFAULT_CHANNEL')
  end
end
