# frozen_string_literal: true

class RolesController < ApplicationController
  def index
    roles = Role.all
    response_array = []
    roles.each do |role|
      response_array << role_replaced_attributes(role)
    end
    response = { 'roles' => response_array }
    render json: response, status: :ok
  end
end
