# frozen_string_literal: true

class SlackNotificationWorker < ApplicationWorker
  # sidekiq_options queue: 'slack_notification'

  def perform(message)
    SlackNotifier.new.send(message, 'ランチ速報')
  end
end
