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

    context 'uidが存在しない' do
      let(:user) { build(:user, uid: '') }

      it { expect(user).not_to be_valid }
    end

    context 'uidが重複している' do
      before { create(:user, uid: 'test', provider: 'slack') }

      let(:user) { build(:user, uid: 'test', provider: 'slack') }

      it { expect(user).not_to be_valid }
    end

    context 'providerが存在しない' do
      let(:user) { build(:user, provider: '') }

      it { expect(user).not_to be_valid }
    end

    context 'プロフィール画像のURLが不正' do
      let(:user) { build(:user, profile_image_url: 'invalid_url') }

      it { expect(user).not_to be_valid }
    end
  end

  describe 'public methods' do
    let(:auth) do
      OmniAuth::AuthHash.new(
        uid: 'test111',
        provider: 'slack',
        info: {
          name: '田中太郎',
          email: 'test_@example.com',
        }
      )
    end

    describe '#find_for_oauth' do
      context '新規ユーザーの場合' do
        it 'ユーザーが作成されること' do
          expect { described_class.find_for_oauth(auth) }.to change(described_class, :count).by(1)
        end
      end

      context '既存ユーザーの場合' do
        before { described_class.find_for_oauth(auth) }

        it 'ユーザーが作成されないこと' do
          expect { described_class.find_for_oauth(auth) }.not_to change(described_class, :count)
        end
      end
    end

    describe '#assign_info' do
      let(:user) { build(:user) }

      it 'ユーザー情報が代入されること' do
        user.assign_info(auth)
        expect(user.uid).to eq 'test111'
        expect(user.provider).to eq 'slack'
        expect(user.name).to eq '田中太郎'
        expect(user.email).to eq 'test_@example.com'
        expect(user.password).to be_present
      end
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
