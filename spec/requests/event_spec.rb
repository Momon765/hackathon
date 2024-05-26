# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Events', type: :request do # rubocop:disable RSpec/MultipleMemoizedHelpers
  let(:department) { create(:department, name: '部署1') }
  let(:other_department) { create(:department, name: '部署2') }
  let(:role) { create(:role, name: '役職1', department: department) }
  let(:other_role) { create(:role, name: '役職2', department: other_department) }
  let(:employment_type) { create(:employment_type, name: '雇用形態1') }
  let(:other_employment_type) { create(:employment_type, name: '雇用形態2') }
  let(:user) { create(:user, sex: 'male', description: '自己紹介1', role: role, employment_type: employment_type) }
  let(:user_with_other_sex) { create(:user, sex: 'female', role: role, employment_type: employment_type) }
  let(:user_with_other_role) { create(:user, sex: 'male', role: other_role, employment_type: employment_type) }
  let(:user_with_other_employment_type) { create(:user, sex: 'male', employment_type: other_employment_type) }
  let(:event) do # rubocop:disable RSpec/IndexedLet
    create(:event, title: 'イベント1', description: '説明1', organizer: user, users: [user, user_with_other_sex],
                roles: [role, other_role], employment_types: [employment_type, other_employment_type])
  end
  let(:other_event) do # rubocop:disable RSpec/IndexedLet
    create(:event, title: 'イベント2', description: '説明2', organizer: user_with_other_sex, users: [user, user_with_other_sex],
                roles: [role, other_role], employment_types: [employment_type, other_employment_type])
  end

  describe '#index' do # rubocop:disable RSpec/MultipleMemoizedHelpers
    let(:expected_body) do
      [
        {
          "events": [
            {
              "title": 'イベント1',
              "description": '説明1',
              "start_date": '2099-06-01T12:00:00Z',
              "end_date": '2099-06-01T14:00:00Z',
              "image_url": 'https://example.com/image.jpg',
              "deadline": '2099-05-01T12:00:00Z',
              "is_anonymous": false,
              "limit": 5,
              "organizer": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "sex": 1,
                "description": user.description,
                "role": {
                  "id": role.id,
                  "name": role.name,
                  "department": {
                    "id": department.id,
                    "name": department.name,
                  },
                },
                "employmentType": {
                  "id": employment_type.id,
                  "name": employment_type.name,
                },
                "created_at": user.created_at,
                "updated_at": user.updated_at,
              },
              "communication_ch_id": '100',
              "created_at": event1.created_at,
              "updated_at": event1.updated_at,
              "users": [
                {
                  "id": user.id,
                  "name": user.name,
                  "email": user.email,
                  "sex": 1,
                  "description": user.description,
                  "role": {
                    "id": role.id,
                    "name": role.name,
                    "department": {
                      "id": department.id,
                      "name": department.name,
                    },
                  },
                  "employmentType": {
                    "id": employment_type.id,
                    "name": employment_type.name,
                  },
                "created_at": user.created_at,
                "updated_at": user.updated_at,
                },
                {
                  "id": user_with_other_sex.id,
                  "name": user_with_other_sex.name,
                  "email": user_with_other_sex.email,
                  "sex": 2,
                  "description": user_with_other_sex.description,
                  "role": {
                    "id": role.id,
                    "name": role.name,
                    "department": {
                      "id": department.id,
                      "name": department.name,
                    },
                  },
                  "employmentType": {
                    "id": employment_type.id,
                    "name": employment_type.name,
                  },
                "created_at": user_with_other_sex.created_at,
                "updated_at": user_with_other_sex.updated_at,
                }
              ],
            }
          ],
        },
        {
          "events": [
            {
              "title": 'イベント2',
              "description": '説明2',
              "start_date": '2099-06-01T12:00:00Z',
              "end_date": '2099-06-01T14:00:00Z',
              "image_url": 'https://example.com/image.jpg',
              "deadline": '2099-05-01T12:00:00Z',
              "is_anonymous": false,
              "limit": 5,
              "organizer": {
                "id": user_with_other_sex.id,
                "name": user_with_other_sex.name,
                "email": user_with_other_sex.email,
                "sex": 2,
                "description": user_with_other_sex.description,
                "role": {
                  "id": role.id,
                  "name": role.name,
                  "department": {
                    "id": department.id,
                    "name": department.name,
                  },
                },
                "employmentType": {
                  "id": employment_type.id,
                  "name": employment_type.name,
                },
              "created_at": user_with_other_sex.created_at,
              "updated_at": user_with_other_sex.updated_at,
              },
              "communication_ch_id": '100',
              "created_at": event1.created_at,
              "updated_at": event1.updated_at,
              "users": [
                {
                  "id": user.id,
                  "name": user.name,
                  "email": user.email,
                  "sex": 1,
                  "description": user.description,
                  "role": {
                    "id": role.id,
                    "name": role.name,
                    "department": {
                      "id": department.id,
                      "name": department.name,
                    },
                  },
                  "employmentType": {
                    "id": employment_type.id,
                    "name": employment_type.name,
                  },
                "created_at": user.created_at,
                "updated_at": user.updated_at,
                },
                {
                  "id": user_with_other_sex.id,
                  "name": user_with_other_sex.name,
                  "email": user_with_other_sex.email,
                  "sex": 2,
                  "description": user_with_other_sex.description,
                  "role": {
                    "id": role.id,
                    "name": role.name,
                    "department": {
                      "id": department.id,
                      "name": department.name,
                    },
                  },
                  "employmentType": {
                    "id": employment_type.id,
                    "name": employment_type.name,
                  },
                "created_at": user_with_other_sex.created_at,
                "updated_at": user_with_other_sex.updated_at,
                }
              ],
            }
          ],
        }
      ]
    end

    it '200 OKを返すこと' do
      sign_in user
      get events_path
      expect(response).to have_http_status(:ok)
      # expect(response.body).to eq(expected_body)
    end
  end

  describe '#show' do
    it '認証済みのユーザーの場合、200 OKを返すこと' do
      sign_in user
      get event_path(event.id)
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      get event_path(event.id)
      expect(response).to have_http_status(:unauthorized)
    end

    it 'user_idが不正な場合、400 Bad Requestを返すこと' do
      sign_in user
      get event_path(0)
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe '#destroy' do
    it '認証済みのユーザーの場合、200 OKを返すこと' do
      sign_in user
      delete event_path(event.id)
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      delete event_path(event.id)
      expect(response).to have_http_status(:unauthorized)
    end

    it '認可を持たないユーザーの場合、リダイレクトすること' do
      sign_in user
      put user_path(other_event.id)
      expect(response).to redirect_to root_url
    end
  end

  describe '#update' do
    let(:valid_params) do
      {
        'event' =>
          {
            name: 'Modified Name1',
          },
      }
    end
    let(:invalid_params) do
      {
        'event' =>
          {
            name: 'Modified Name2',
            deadline: '2000-12-31',
          },
      }
    end

    it '認証済みのユーザーの場合、200 OKを返すこと' do
      sign_in user
      patch event_path(event.id), params: valid_params
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      patch event_path(event.id), params: valid_params
      expect(response).to have_http_status(:unauthorized)
    end

    it '認可を持たないユーザーの場合、リダイレクトすること' do
      sign_in user
      patch event_path(other_event.id), params: valid_params
      expect(response).to redirect_to root_url
    end

    it 'paramsが不正な場合、400 Bad Requestを返すこと' do
      sign_in user
      patch event_path(event.id), params: invalid_params
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe '#update' do
    let(:valid_params) do
      {
        'event' =>
          {
            name: 'Modified Name1',
          },
      }
    end
    let(:invalid_params) do
      {
        'event' =>
          {
            name: 'Modified Name2',
            deadline: '2000-12-31',
          },
      }
    end

    it '認証済みのユーザーの場合、200 OKを返すこと' do
      sign_in user
      patch event_path(event.id), params: valid_params
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      patch event_path(event.id), params: valid_params
      expect(response).to have_http_status(:unauthorized)
    end

    it '認可を持たないユーザーの場合、リダイレクトすること' do
      sign_in user
      patch event_path(other_event.id), params: valid_params
      expect(response).to redirect_to root_url
    end

    it 'paramsが不正な場合、400 Bad Requestを返すこと' do
      sign_in user
      patch event_path(event.id), params: invalid_params
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe '#participants' do
    let(:valid_params) do
      {
        user_id: user.id,
      }
    end
    let(:invalid_params) do
      {
        user_id: -1,
      }
    end

    it '認証済みのユーザーの場合、200 OKを返すこと' do
      sign_in user
      put participants_event_path(event.id), params: valid_params
      expect(response).to have_http_status(:ok)
    end

    it '未認証のユーザーの場合、401 Unauthorizedを返すこと' do
      put participants_event_path(event.id), params: valid_params
      expect(response).to have_http_status(:unauthorized)
    end

    it 'paramsが不正な場合、400 Bad Requestを返すこと' do
      sign_in user
      put participants_event_path(event.id), params: invalid_params
      expect(response).to have_http_status(:bad_request)
    end
  end
end
