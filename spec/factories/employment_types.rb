# frozen_string_literal: true

FactoryBot.define do
  factory :employment_type do
    sequence(:name) { |n| "employment_type#{n}" }
  end
end
