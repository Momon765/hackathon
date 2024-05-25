# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.3.0'
gem 'bootsnap', require: false
gem 'dotenv-rails'
gem 'importmap-rails'
gem 'pg', '~> 1.1'
gem 'puma', '>= 5.0'
gem 'rails', '~> 7.1.3', '>= 7.1.3.2'
gem 'redis', '~> 5.1', '>= 5.1.0'
gem 'sidekiq', '~> 7.2', '>= 7.2.1'
gem 'slack-notifier'
gem 'sprockets-rails'
gem 'stimulus-rails'
gem 'tailwindcss-rails'
gem 'omniauth-sign-in-with-slack'
gem 'omniauth-rails_csrf_protection'
gem 'turbo-rails'
gem 'tzinfo-data', platforms: %i[windows jruby]
gem 'vite_rails'

gem 'devise'

group :development, :test do
  gem 'debug', platforms: %i[mri windows]
  gem 'dotenv'
  gem 'erb_lint'
  gem 'factory_bot_rails'
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'rubocop'
  gem 'rubocop-ast'
  gem 'rubocop-performance'
  gem 'rubocop-rails'
  gem 'rubocop-rake'
  gem 'rubocop-rspec'
end

group :development do
  gem 'ruby-lsp'
  gem 'web-console'
  gem 'pry-rails'
  gem 'pry-byebug'
  gem 'pry-doc'
end

group :test do
  gem 'capybara-playwright-driver'
end
