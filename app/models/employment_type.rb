# frozen_string_literal: true

class EmploymentType < ApplicationRecord
  has_many :users, dependent: :destroy

  TRAINEE_ID = 3
end
