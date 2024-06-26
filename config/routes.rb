Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Sidekiq
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check


  # Defines the root path route ("/")
  # root "posts#index"
  root 'root#index'
  resources :events,  only: [:index, :create, :show, :update, :destroy] do
    member do
      post 'participants'
    end
  end

  get '/me' => 'users#me'

  resources :users, only: [:show, :update]
  resources :employment_types, only: [:index]
  resources :departments, only: [:index]
  resources :roles, only: [:index]
end
