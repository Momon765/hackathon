class AddOrganizerToEvents < ActiveRecord::Migration[7.1]
  def change
    rename_column :events, :owner_id, :organizer_id
  end
end
