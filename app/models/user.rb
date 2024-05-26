# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable, :omniauthable


  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true
  validates :uid, presence: true, uniqueness: true
  validates :provider, presence: true
  validates :profile_image_url, format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]), allow_blank: true }

  enum sex: {
    unknown: 0,
    male: 1,
    female: 2,
  }

  belongs_to :role, optional: true
  belongs_to :employment_type, optional: true
  has_many :events, dependent: :destroy

  before_save :check_role

  class << self
    # ユーザー情報を取得
    # @param [OmniAuth::AuthHash] auth
    # @return [User]
    def find_for_oauth(auth)
      @user = User.find_or_initialize_by(uid: auth.uid, provider: auth.provider)
      @user.assign_info(auth)
      @user.save!
      @user
    rescue StandardError => e
      e.message
    end
  end

  # ユーザー情報を代入
  # @param [OmniAuth::AuthHash] auth
  def assign_info(auth)
    self.uid = auth.uid
    self.provider = auth.provider
    self.name = auth.info.name
    self.email = auth.info.email
    self.profile_image_url = auth.info.picture
    self.password = Devise.friendly_token[0, 20]
  end

  def replaced_attributes
    user_attr = attributes

    user_attr['employment_type'] = employment_type&.attributes
    user_attr.delete('employment_type_id')

    user_attr['role'] = role&.replaced_attributes
    user_attr.delete('role_id')

    user_attr
  end

  private

  # 研修生は役職を持たない
  # @return [void]
  def check_role
    self.role_id = nil if employment_type_id == EmploymentType::TRAINEE_ID
  end
end
