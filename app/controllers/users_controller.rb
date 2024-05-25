# frozen_string_literal: true

class UsersController < ApplicationController
  protect_from_forgery :except => %i[update]

  def show
    user = User.find_by(id: params[:id])
    if user.nil?
      response = {
        'status' => 400,
        'message' => 'Bad Request',
        'details' => {
          'title' => 'title is required',
        },
      }
      render json: response, status: :bad_request
    else
      response = { 'user' => user_replaced_attributes(user) }
      render json: response, status: :ok
    end
  end

  def update
    user = User.find_by(id: params[:id])
    user.update!(user_params)
    response = { 'users' => user_replaced_attributes(user) }
    render json: response, status: :ok
  rescue => e
    Rails.logger.debug e
    response = {
      'status' => 400,
      'message' => 'Bad Request',
      'details' => {
        'title' => 'title is required',
      },
    }
    render json: response, status: :bad_request
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :sex,
      :description,
      :role_id,
      :employment_type_id
    )
  end
end
