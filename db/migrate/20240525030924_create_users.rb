class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.smallint :sex, null: false, default: 0
      t.text :description

      t.references :role_id, foreign_key: true
      t.references :employement_type_id, null: false, foreign_key: true

      t.timestamps
    end
  end
end
