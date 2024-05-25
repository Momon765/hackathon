# frozen_string_literal: true

class EmploymentTypesController < ApplicationController
  def index
    employment_types = EmploymentType.all
    response_array = employment_types.map(&:attributes)
    response = { 'events' => response_array }
    render json: response, status: :ok
  end
end
