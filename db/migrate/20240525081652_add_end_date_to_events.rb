class AddEndDateToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :end_date, :datetime, null: false
    rename_column :events, :date, :start_date
  end
end
