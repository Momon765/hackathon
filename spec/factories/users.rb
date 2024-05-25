FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "user#{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
    sex: { :male }
    role_id: { 1 }
    employement_type_id: { 1 }
  end
end
