# frozen_string_literal: true

class EventsEmploymentType < ApplicationRecord
  belongs_to :event
  belongs_to :employment_type
end
