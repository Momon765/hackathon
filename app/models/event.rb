# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :organizer, class_name: 'User'
  validates :title, presence: true, length: { maximum: 64 }
  validates :description, length: { maximum: 255 }
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :limit, numericality: { greater_than: 0 }, allow_nil: true
  validates :scope_sex, presence: true
  validate :earlier_start_date_than_end_date
  validate :earlier_deadline_than_start_date
  validate :later_deadline_than_current_time
  validate :later_start_date_than_current_time
  validate :never_overlap_date

  has_many :users_events, dependent: :destroy
  has_many :users, through: :users_events, dependent: :destroy
  has_many :events_employment_types, dependent: :destroy
  has_many :employment_types, through: :events_employment_types, dependent: :destroy
  has_many :events_roles, dependent: :destroy
  has_many :roles, through: :events_roles, dependent: :destroy

  enum scope_sex: {
    no_scope: 0,
    male: 1,
    female: 2,
  }

  def earlier_start_date_than_end_date
    return if start_date.nil? || end_date.nil?

    errors.add(:start_date, 'は終了日時より早い日時を設定してください') if start_date > end_date
  end

  def earlier_deadline_than_start_date
    return if deadline.nil? || start_date.nil?

    errors.add(:deadline, 'は開催日時より早い日時を設定してください') if deadline > start_date
  end

  def later_deadline_than_current_time
    return if deadline.nil?

    errors.add(:deadline, 'は現在時刻より遅い日時を設定してください') if Time.zone.now > deadline
  end

  def later_start_date_than_current_time
    return if start_date.nil?

    errors.add(:start_date, 'は現在時刻より遅い日時を設定してください') if Time.zone.now > start_date
  end

  def never_overlap_date
    return if start_date.nil? || end_date.nil? || organizer_id.nil?

    events = if id.nil?
               Event.where('organizer_id = ? and end_date > ? and ? > start_date', organizer_id, start_date, end_date)
             else
               Event.where('id != ? and organizer_id = ? and end_date > ? and ? > start_date', id, organizer_id, start_date, end_date)
             end

    errors.add(:organizer_id, '開催期間が重なるイベントが存在します') unless events.empty?
  end
end
