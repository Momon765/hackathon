class User < ApplicationRecord
  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true

  enum sex: {
    unknown: 0,
    male: 1,
    female: 2,
  }

  belongs_to :role, optional: true
  belongs_to :employement_type

  before_save :check_role

  private

  # 研修生は役職を持たない
  # @return [void]
  def check_role
    self.role_id = nil if employement_type_id == EmployementType.TRAINEE_ID
  end
end
