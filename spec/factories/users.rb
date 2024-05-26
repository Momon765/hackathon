# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "user#{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
    sex { :male }
    password { 'password' }
    sequence(:uid) { |n| "uid#{n}" }
    provider { 'slack' }
    profile_image_url { 'http://example.com/image.jpg' }
    role
    employment_type
  end
end
