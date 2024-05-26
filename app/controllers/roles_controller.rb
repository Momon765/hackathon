# frozen_string_literal: true

class RolesController < ApplicationController
  def index
    roles = Role.all
    response = { 'roles' => roles.map(&:replaced_attributes) }
    render json: response, status: :ok
  end
end
