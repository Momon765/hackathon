# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable
  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, uniqueness: true

  enum sex: {
    unknown: 0,
    male: 1,
    female: 2,
  }

  belongs_to :role, optional: true
  belongs_to :employment_type
  has_many :events, dependent: :destroy

  before_save :check_role

  class << self
    def find_for_oauth(auth)
      @user = User.find_or_initialize_by(uid: auth.uid, provider: auth.provider)
      assign_info(auth)
      attach_image(auth.info.image) if auth.info.image
      @user.skip_confirmation!
      @user.save!
      @user
    rescue StandardError => e
      e.message
    end

    def assign_info(auth)
      @user.id = auth.uid
      @user.provider = auth.provider
      @user.name = auth.info.name
      @user.email = auth.info.email
      @user.password = Devise.friendly_token[0, 20]
    end

    def attach_image(image_url)
      @user.image.attach(io: URI.parse(image_url).open, filename: "user_#{@user.id}_image")
      # ファイルの一番上に　require 'open-uri' が必要
    end
  end

  private

  # 研修生は役職を持たない
  # @return [void]
  def check_role
    self.role_id = nil if employment_type_id == EmploymentType::TRAINEE_ID
  end
end
