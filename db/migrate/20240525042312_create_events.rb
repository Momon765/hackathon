class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.datetime :date, null: false
      t.string :title, null: false
      t.datetime :deadline
      t.string :description
      t.boolean :is_anonymous, null: false, default: false
      t.integer :limit
      t.references :owner, foreign_key: { to_table: :users }
      t.integer :communication_ch_id
      t.integer :scope_sex, null: false, default: 0

      t.timestamps
    end
  end
end
