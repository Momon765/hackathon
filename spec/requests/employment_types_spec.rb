# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'EmploymentTypes', type: :request do
  let!(:employment_type) { create(:employment_type, name: '雇用形態1') }
  let!(:other_employment_type) { create(:employment_type, name: '雇用形態2') }

  def check(body, expected_body)
    keys = %w[id name]
    keys.each do |key|
      expect(body['employment_types'][0][key]).to eq expected_body['employment_types'][0][key]
      expect(body['employment_types'][1][key]).to eq expected_body['employment_types'][1][key]
    end
  end

  describe '#index' do
    it '雇用形態の一覧と200 OKを返すこと' do
      get employment_types_path
      json = JSON.parse(response.body)

      expected_body = {
        'employment_types' =>
        [
          employment_type.attributes,
          other_employment_type.attributes
        ],
      }
      expect(response).to have_http_status(:ok)
      check(json, expected_body)
    end
  end
end
