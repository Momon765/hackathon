# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable
  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :provider, presence: true
  validates :profile_image_url, format: { with: URI.regexp(%w[http https]), allow_blank: true }

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
      assign_info(auth)
      @user.save!
      @user
    rescue StandardError => e
      e.message
    end

    # ユーザー情報を代入
    # @param [OmniAuth::AuthHash] auth
    def assign_info(auth)
      @user.uid = auth.uid
      @user.provider = auth.provider
      @user.name = auth.info.name
      @user.email = auth.info.email
      @user.profile_image_url = auth.info.picture
      @user.password = Devise.friendly_token[0, 20]
    end
  end

  private

  # 研修生は役職を持たない
  # @return [void]
  def check_role
    self.role_id = nil if employment_type_id == EmploymentType::TRAINEE_ID
  end
end
