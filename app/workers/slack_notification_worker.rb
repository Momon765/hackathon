# frozen_string_literal: true

class SlackNotificationWorker < ApplicationWorker
  # sidekiq_options queue: 'slack_notification'

  # 時間指定の場合は .perform_at(時間, 引数)
  # 非同期で即実行したい時は .perform_async(引数)
  def perform(message)
    ChatNotification.new.notice(message)
  end
end
