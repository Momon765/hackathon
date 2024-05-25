# frozen_string_literal: true

class Event < ApplicationRecord
  validates :title, presence: true, length: { maximum: 64 }
  validates :description, length: { maximum: 255 }
  validates :date, presence: true
  validates :limit, numericality: { greater_than: 0 }, allow_nil: true
  validates :scope_sex, presence: true
  validates :owner_id, uniqueness: { scope: [:date] }
  validate :earlier_deadline_than_date
  validate :later_deadline_than_current_time
  validate :later_date_than_current_time

  enum scope_sex: {
    no_scope: 0,
    male: 1,
    female: 2,
  }

  def earlier_deadline_than_date
    return if deadline.nil? || date.nil?

    errors.add(:deadline, 'は開催日時より早い日時を設定してください') if deadline > date
  end

  def later_deadline_than_current_time
    return if deadline.nil?

    errors.add(:deadline, 'は現在時刻より遅い日時を設定してください') if Time.now > deadline
  end

  def later_date_than_current_time
    return if date.nil?

    errors.add(:date, 'は現在時刻より遅い日時を設定してください') if Time.now > date
  end
end
