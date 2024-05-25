# frozen_string_literal: true

class DepartmentsController < ApplicationController
  def index
    departments = Department.all
    response_array = departments.map(&:attributes)
    response = { 'roles' => response_array }
    render json: response, status: :ok
  end
end
