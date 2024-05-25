# frozen_string_literal: true

class EventRole < ApplicationRecord
  belongs_to :event
  belongs_to :role
end
