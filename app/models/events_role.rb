# frozen_string_literal: true

class EventsRole < ApplicationRecord
  belongs_to :event
  belongs_to :role
end
