# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validation' do
    let(:user) { build(:user) }

    it { expect(user).to be_valid }

    context '名前が存在しない' do
      let(:user) { build(:user, name: '') }

      it { expect(user).not_to be_valid }
    end

    context '名前が50文字以上' do
      let(:user) { build(:user, name: 'a' * 51) }

      it { expect(user).not_to be_valid }
    end

    context 'メールアドレスが存在しない' do
      let(:user) { build(:user, email: '') }

      it { expect(user).not_to be_valid }
    end

    context 'メールアドレスが重複している' do
      before { create(:user, email: 'test@example.com') }

      let(:user) { build(:user, email: 'test@example.com') }

      it { expect(user).not_to be_valid }
    end
  end

  describe 'callback' do
    describe 'check_role' do
      let(:role) { create(:role, id: 999) }
      let(:user) { create(:user, role: role, employment_type: employment_type) }

      before { stub_const('EmploymentType::TRAINEE_ID', 777) }

      context '研修生の場合' do
        let(:employment_type) { create(:employment_type, id: 777) }

        it { expect(user.role_id).to be_nil }
      end

      context '研修生以外の場合' do
        let(:employment_type) { create(:employment_type, id: 111) }

        it { expect(user.role_id).to be 999 }
      end
    end
  end
end
