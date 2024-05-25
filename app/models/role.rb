# frozen_string_literal: true

class Role < ApplicationRecord
  belongs_to :department
  has_many :users, dependent: :destroy
end
