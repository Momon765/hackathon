# frozen_string_literal: true

class EventsController < ApplicationController # rubocop:disable Metrics/ClassLength
  protect_from_forgery :except => %i[create participants]

  def index
    events = Event.order('deadline desc')
    response_array = []
    events.each do |event|
      response_array << event_replaced_attributes(event)
    end
    response = { 'events' => response_array }
    render json: response, status: :ok
  end

  def create
    attrs = event_params
    event = Event.new(attrs)
    event.save!
    response = { 'events' => event_replaced_attributes(event) }
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

  def show
    event = Event.find_by(id: params[:id])
    if event.nil?
      response = {
        'status' => 400,
        'message' => 'Bad Request',
        'details' => {
          'title' => 'title is required',
        },
      }
      render json: response, status: :bad_request
    else
      response = { 'event' => event_replaced_attributes(event) }
      render json: response, status: :ok
    end
  end

  def update
    event = Event.find_by(id: params[:id])
    event.update!(event_params)
    response = { 'events' => event_replaced_attributes(event) }
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

  def destroy
    event = Event.find_by(id: params[:id])
    if !event.nil? && (destroyed_event = event.destroy)
      response = { 'event' => event_replaced_attributes(destroyed_event) }
      render json: response, status: :ok
    else
      response = {
        'status' => 400,
        'message' => 'Bad Request',
        'details' => {
          'title' => 'title is required',
        },
      }
      render json: response, status: :bad_request
    end
  end

  def participants
    event_id = params[:id]
    user_id = params[:user_id]
    event = Event.find_by(id: event_id)
    user = User.find_by(id: user_id)
    event.users << user
    event.save!
    response = { 'event' => event_replaced_attributes(event) }
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

  def event_params
    params.require(:event).permit(
      :title,
      :is_anonymous,
      :start_date,
      :end_date,
      :deadline,
      :limit,
      :organizer_id,
      :role_ids,
      :employment_type_ids,
      :scope_sex,
      :description
    )
  end
end
