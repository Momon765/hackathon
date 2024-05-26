# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Roles', type: :request do
  let!(:department) { create(:department, name: '部署1') }
  let!(:other_department) { create(:department, name: '部署2') }
  let!(:role) { create(:role, name: '役職1', department: department) }
  let!(:other_role) { create(:role, name: '役職2', department: other_department) }

  def check(body, expected_body)
    keys = %w[id name]
    keys.each do |key|
      expect(body['roles'][0][key]).to eq expected_body['roles'][0][key]
      expect(body['roles'][1][key]).to eq expected_body['roles'][1][key]
      expect(body['roles'][0]['department'][key]).to eq expected_body['roles'][0]['department'][key]
      expect(body['roles'][1]['department'][key]).to eq expected_body['roles'][1]['department'][key]
    end
  end

  describe '#index' do
    it '役職の一覧と200 OKを返すこと' do
      get roles_path
      json = JSON.parse(response.body)

      puts json

      expected_body = {
        'roles' =>
        [
          role.attributes,
          other_role.attributes
        ],
      }
      expect(response).to have_http_status(:ok)
      check(json, expected_body)
    end
  end
end
