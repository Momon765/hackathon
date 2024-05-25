# frozen_string_literal: true

# ジョブの基底クラス
class ApplicationWorker
  include Sidekiq::Worker

  def perform
    Rails.logger.debug 'Hello, World!'
  end
end
