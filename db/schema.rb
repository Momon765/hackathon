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

ActiveRecord::Schema[7.1].define(version: 2024_05_25_133645) do
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

  create_table "events", force: :cascade do |t|
    t.datetime "start_date", null: false
    t.string "title", null: false
    t.datetime "deadline"
    t.string "description"
    t.boolean "is_anonymous", default: false, null: false
    t.integer "limit"
    t.bigint "organizer_id"
    t.integer "communication_ch_id"
    t.integer "scope_sex", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "end_date", null: false
    t.index ["organizer_id", "start_date"], name: "index_events_on_organizer_id_and_start_date", unique: true
    t.index ["organizer_id"], name: "index_events_on_organizer_id"
  end

  create_table "events_employment_types", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "employment_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employment_type_id"], name: "index_events_employment_types_on_employment_type_id"
    t.index ["event_id", "employment_type_id"], name: "idx_on_event_id_employment_type_id_c8784e56ad", unique: true
    t.index ["event_id"], name: "index_events_employment_types_on_event_id"
  end

  create_table "events_roles", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id", "role_id"], name: "index_events_roles_on_event_id_and_role_id", unique: true
    t.index ["event_id"], name: "index_events_roles_on_event_id"
    t.index ["role_id"], name: "index_events_roles_on_role_id"
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
    t.bigint "employment_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "uid", null: false
    t.string "provider", null: false
    t.string "profile_image_url"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["employment_type_id"], name: "index_users_on_employment_type_id"
    t.index ["role_id"], name: "index_users_on_role_id"
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

  create_table "users_events", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "event_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_users_events_on_event_id"
    t.index ["user_id", "event_id"], name: "index_users_events_on_user_id_and_event_id", unique: true
    t.index ["user_id"], name: "index_users_events_on_user_id"
  end

  add_foreign_key "events", "users", column: "organizer_id"
  add_foreign_key "events_employment_types", "employment_types"
  add_foreign_key "events_employment_types", "events"
  add_foreign_key "events_roles", "events"
  add_foreign_key "events_roles", "roles"
  add_foreign_key "roles", "departments"
  add_foreign_key "users", "employment_types"
  add_foreign_key "users", "roles"
  add_foreign_key "users_events", "events"
  add_foreign_key "users_events", "users"
end
