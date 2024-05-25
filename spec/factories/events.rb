# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    date { '2099-05-26 12:00:00' }
    title { 'イベント名' }
    deadline { '2099-05-25 23:00:00' }
    description { 'イベント説明' }
    is_anonymous { false }
    limit { 5 }
    owner_id { FactoryBot.create(:user).id }
    scope_sex { 'no_scope' }
    communication_ch_id { 100 }
  end
end