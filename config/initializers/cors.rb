Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins [ENV['FRONTEND_URL'], 'https://techouse.slack.com', 'httpss://devsite.local']
      resource '*', methods: :any, headers: :any,
      credentials: true
    end
end