# frozen_string_literal: true

class EmploymentTypesController < ApplicationController
  def index
    employment_types = EmploymentType.all
    response = { 'employment_types' => employment_types.map(&:attributes) }
    render json: response, status: :ok
  end
end
