# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_25_043341) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "departments", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "employment_types", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "event_employment_types", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "employment_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employment_type_id"], name: "index_event_employment_types_on_employment_type_id"
    t.index ["event_id", "employment_type_id"], name: "idx_on_event_id_employment_type_id_1506cba35e", unique: true
    t.index ["event_id"], name: "index_event_employment_types_on_event_id"
  end

  create_table "event_roles", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id", "role_id"], name: "index_event_roles_on_event_id_and_role_id", unique: true
    t.index ["event_id"], name: "index_event_roles_on_event_id"
    t.index ["role_id"], name: "index_event_roles_on_role_id"
  end

  create_table "events", force: :cascade do |t|
    t.datetime "date", null: false
    t.string "title", null: false
    t.datetime "deadline"
    t.string "description"
    t.boolean "is_anonymous", default: false, null: false
    t.integer "limit"
    t.bigint "owner_id"
    t.integer "communication_ch_id"
    t.integer "scope_sex", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id", "date"], name: "index_events_on_owner_id_and_date", unique: true
    t.index ["owner_id"], name: "index_events_on_owner_id"
  end

  create_table "roles", force: :cascade do |t|
    t.bigint "department_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["department_id"], name: "index_roles_on_department_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.integer "sex", default: 0, null: false
    t.text "description"
    t.bigint "role_id"
    t.bigint "employment_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["employment_type_id"], name: "index_users_on_employment_type_id"
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "event_employment_types", "employment_types"
  add_foreign_key "event_employment_types", "events"
  add_foreign_key "event_roles", "events"
  add_foreign_key "event_roles", "roles"
  add_foreign_key "events", "users", column: "owner_id"
  add_foreign_key "roles", "departments"
  add_foreign_key "users", "employment_types"
  add_foreign_key "users", "roles"
end
