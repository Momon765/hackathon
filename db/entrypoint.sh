echo "db:reset"
bundle exec rails db:reset && \
bundle exec rails db:reset RAILS_ENV=test
#bundle exec rails db:drop && \
#bundle exec rails db:drop RAILS_ENV=test
#bundle exec rails db:create && \
#bundle exec rails db:create RAILS_ENV=test

#echo "db:migrate"
#bundle exec rails db:migrate
#bundle exec rails db:migrate RAILS_ENV=test

echo "db:fixtures:load"
bundle exec rails db:fixtures:load FIXTURES_PATH=./db/fixtures && \
bundle exec rails db:fixtures:load FIXTURES_PATH=./db/fixtures RAILS_ENV=test


echo "🎉開発環境用DB作成完了"
