# frozen_string_literal: true

class DepartmentsController < ApplicationController
  def index
    departments = Department.all
    response = { 'departments' => departments.map(&:attributes) }
    render json: response, status: :ok
  end
end
