class CreateEventsRoles < ActiveRecord::Migration[7.1]
  def change
    create_table :events_roles do |t|
      t.references :event, null: false, foreign_key: true
      t.references :role, null: false, foreign_key: true

      t.timestamps
    end
    add_index :events_roles, [:event_id, :role_id], unique: true
  end
end
