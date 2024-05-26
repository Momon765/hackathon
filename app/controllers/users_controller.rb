# frozen_string_literal: true

class UsersController < ApplicationController
  # protect_from_forgery :except => %i[update]
  # before_action :logged_in_user, only: %i[show update me]
  # bef
  # ore_action :logged_in_user, only: %i[show update me]


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
      response = { 'user' => user.replaced_attributes }
      render json: response, status: :ok
    end
  end

  def update
    user = User.find_by(id: params[:id])
    user.update!(user_params)
    response = { 'users' => user.replaced_attributes }
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

  def me
    user = User.first # current_user
    if user.nil?
      response = {
        'status' => 401,
        'message' => 'Unauthorized',
      }
      render json: response, status: :unauthorized
    else
      response = { 'user' => user.replaced_attributes }
      render json: response, status: :ok
    end
  rescue StandardError => e
    e.message
    response = {
      'status' => 500,
      'message' => 'Internal Server Error',
    }
    render json: response, status: :internal_server_error
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
