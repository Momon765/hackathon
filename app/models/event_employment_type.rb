# frozen_string_literal: true

class EventEmploymentType < ApplicationRecord
  belongs_to :event
  belongs_to :employment_type
end
