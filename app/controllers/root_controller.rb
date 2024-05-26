# frozen_string_literal: true

class RootController < ApplicationController
  before_action :redirect_to_frontend

  def index; end

  private

  def redirect_to_frontend
    return unless current_user

    redirect_to frontend_url, allow_other_host: true
  end

  def frontend_url
    ENV.fetch('FRONTEND_URL', 'http://localhost:5173')
  end
end
