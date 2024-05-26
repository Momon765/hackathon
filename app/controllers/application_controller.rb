# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  private

  def authenticate_user
    redirect_to root_path unless current_user&.id == id
  end

  def authenticate_event
    event = Event.find_by(id: id)
    redirect_to root_path unless current_user&.id == event&.organizer_id
  end

  def logged_in_user
    return unless current_user.nil?

    response = {
      'status' => 401,
      'message' => 'Unauthorized',
    }
    render json: response, status: :unauthorized
  end

  def id
    params[:id].to_i
  end
end
