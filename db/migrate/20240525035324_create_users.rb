class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.integer :sex, null: false, default: 0
      t.text :description

      t.references :role, foreign_key: true
      t.references :employment_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
