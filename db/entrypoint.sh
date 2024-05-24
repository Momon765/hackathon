echo "db:reset"
bundle exec rails db:reset
bundle exec rails db:reset RAILS_ENV=test

echo "db:fixtures:load development"
bundle exec rails db:fixtures:load FIXTURES_PATH=./db/fixtures

echo "db:fixtures:load test"
bundle exec rails db:fixtures:load FIXTURES_PATH=./db/fixtures RAILS_ENV=test

echo "🎉開発環境用DB作成完了"
