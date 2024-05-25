# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Event, type: :model do
  let(:event) { create(:event) }

  describe 'validation' do
    it 'NOT NULL制約のあるカラムに有効な値が入っていれば有効であること' do
      expect(event).to be_valid
    end

    describe 'start_date' do
      it 'nilは無効であること' do
        event.start_date = nil
        expect(event).not_to be_valid
      end

      it '現在時刻以前の開始日時は無効であること' do
        event.start_date = DateTime.new(2020, 6, 1, 12, 0)
        event.end_date = DateTime.new(2020, 6, 1, 14, 0)
        expect(event).not_to be_valid
      end
    end

    describe 'end_date' do
      it 'nilは無効であること' do
        event.end_date = nil
        expect(event).not_to be_valid
      end

      it '開始日時以前の終了日時は無効であること' do
        event.start_date = DateTime.new(2099, 6, 1, 12, 0)
        event.end_date = DateTime.new(2099, 6, 1, 10, 0)
        expect(event).not_to be_valid
      end
    end

    describe 'title' do
      it 'nilは無効であること' do
        event.title = nil
        expect(event).not_to be_valid
      end

      it '空白文字は無効であること' do
        event.title = '      '
        expect(event).not_to be_valid
      end

      it '64文字以下は有効であること' do
        event.title = 'あ' * 64
        expect(event).to be_valid
      end

      it '65文字以上は無効であること' do
        event.title = 'あ' * 65
        expect(event).not_to be_valid
      end
    end

    describe 'deadline' do
      it 'nilは有効であること' do
        event.deadline = nil
        expect(event).to be_valid
      end

      it '開催日時以降の締切は無効であること' do
        event.deadline = Date.new(2099, 6, 1)
        event.start_date = Date.new(2099, 5, 31)
        expect(event).not_to be_valid
      end

      it '現在時刻以前の締切は無効であること' do
        event.deadline = Date.new(2020, 6, 1)
        expect(event).not_to be_valid
      end
    end

    describe 'description' do
      it 'nilは有効であること' do
        event.description = nil
        expect(event).to be_valid
      end

      it '255文字以下は有効であること' do
        event.description = 'あ' * 255
        expect(event).to be_valid
      end

      it '256文字以上は無効であること' do
        event.description = 'あ' * 256
        expect(event).not_to be_valid
      end
    end

    describe 'is_anonymous' do
      it 'nilは無効であること' do
        event.is_anonymous = nil
        expect(event).to be_valid
      end

      it '初期値はfalseであること' do
        new_event = described_class.new
        expect(new_event.is_anonymous).to eq false
      end
    end

    describe 'limit' do
      it 'nilは有効であること' do
        event.limit = nil
        expect(event).to be_valid
      end

      it '0以下は無効であること' do
        event.limit = 0
        expect(event).not_to be_valid
      end
    end

    describe 'owner_id' do
      it 'nilは有効であること' do
        event.limit = nil
        expect(event).to be_valid
      end

      it '同じ開催者で開催日時の範囲が重なるイベントが存在したら無効であること' do
        owner = create(:user)
        create(:event, owner_id: owner.id,
                start_date: DateTime.new(2099, 6, 1, 12, 0), end_date: DateTime.new(2099, 6, 1, 14, 0))
        new_event = build(:event, owner_id: owner.id,
                      start_date: DateTime.new(2099, 6, 1, 13, 0), end_date: DateTime.new(2099, 6, 1, 15, 0))
        expect(new_event).not_to be_valid
      end
    end

    describe 'scope_sex' do
      it 'nilは無効であること' do
        event.scope_sex = nil
        expect(event).not_to be_valid
      end
    end
  end
end
