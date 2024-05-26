# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users', type: :request do
  let(:department) { create(:department, name: '部署1') }
  let(:other_department) { create(:department, name: '部署2') }
  let(:role) { create(:role, name: '役職1', department: department) }
  let(:other_role) { create(:role, name: '役職2', department: other_department) }
  let(:employment_type) { create(:employment_type, name: '雇用形態1') }
  let(:other_employment_type) { create(:employment_type, name: '雇用形態2') }
  let!(:user) { create(:user, sex: 'male', description: '自己紹介1', role: role, employment_type: employment_type) }
  let!(:user_with_other_sex) { create(:user, sex: 'female', role: role, employment_type: employment_type) }
  let!(:user_with_other_role) { create(:user, sex: 'male', role: other_role, employment_type: employment_type) }
  let!(:user_with_other_employment_type) { create(:user, sex: 'male', employment_type: other_employment_type) }

  describe '#show' do
    it '認証済みのユーザーの場合、200 OKを返すこと' do
      sign_in user
      get user_path(user.id)
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      get user_path(user.id)
      expect(response).to have_http_status(:unauthorized)
    end

    it 'user_idが不正な場合、400 Bad Requestを返すこと' do
      sign_in user
      get user_path(0)
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe '#update' do
    let(:valid_params) do
      {
        'user' =>
          {
            name: 'Modified Name1',
            sex: 'male',
          },
      }
    end
    let(:invalid_params) do
      {
        'user' =>
          {
            name: 'Modified Name2',
            sex: 'invalid data',
          },
      }
    end

    it '認証済みのユーザーの場合、200 OKを返すこと', :slow do
      sign_in user
      patch user_path(user.id), params: valid_params
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      patch user_path(user.id), params: valid_params
      expect(response).to have_http_status(:unauthorized)
    end

    it '認可を持たないユーザーの場合、リダイレクトすること' do
      sign_in user
      patch user_path(user_with_other_sex), params: valid_params
      expect(response).to redirect_to root_url
    end

    it 'paramsが不正な場合、400 Bad Requestを返すこと' do
      sign_in user
      patch user_path(user.id), params: invalid_params
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe '#me' do
    it '認証済みのユーザーの場合、200 OKを返すこと' do
      sign_in user
      get '/me'
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      get '/me'
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
