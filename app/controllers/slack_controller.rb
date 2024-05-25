class SlackController < ApplicationController
  def callback
    p request.env['omniauth.auth'].info
    redirect_to '/'
  end
end
