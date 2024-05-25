class CreateEventsEmploymentTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :events_employment_types do |t|
      t.references :event, null: false, foreign_key: true
      t.references :employment_type, null: false, foreign_key: true

      t.timestamps
    end
    add_index :events_employment_types, [:event_id, :employment_type_id], unique: true
  end
end
