# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Departments', type: :request do
  let!(:department) { create(:department, name: '部署1') }
  let!(:other_department) { create(:department, name: '部署2') }

  def check(body, expected_body)
    keys = %w[id name]
    keys.each do |key|
      expect(body['departments'][0][key]).to eq expected_body['departments'][0][key]
      expect(body['departments'][1][key]).to eq expected_body['departments'][1][key]
    end
  end

  describe '#index' do
    it '部署の一覧と200 OKを返すこと' do
      get departments_path
      json = JSON.parse(response.body)

      expected_body = {
        'departments' =>
        [
          department.attributes,
          other_department.attributes
        ],
      }
      expect(response).to have_http_status(:ok)
      check(json, expected_body)
    end
  end
end
