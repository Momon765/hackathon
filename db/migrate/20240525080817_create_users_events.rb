class CreateUsersEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :users_events do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
    add_index :users_events, [:user_id, :event_id], unique: true
  end
end
