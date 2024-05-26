# frozen_string_literal: true

class Role < ApplicationRecord
  belongs_to :department
  has_many :users, dependent: :destroy

  def replaced_attributes
    role_attr = attributes
    role_attr['department'] = department&.attributes
    role_attr&.delete('department_id')

    role_attr
  end
end
