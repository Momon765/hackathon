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
      let(:user) { build(:user, role_id: 3, employment_type_id: employment_type_id) }

      before { user.save }

      context '研修生の場合' do
        let(:employment_type_id) { EmploymentType::TRAINEE_ID }

        it { expect(user.role_id).to be_nil }
      end

      context '研修生以外の場合' do
        let(:employment_type_id) { 2 }

        it { expect(user.role_id).to be 3 }
      end
    end
  end
end
