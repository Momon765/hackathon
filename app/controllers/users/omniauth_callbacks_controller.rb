# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # More info at:
  # https://github.com/heartcombo/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
  #
  def slack
    callback_from :slack
  end

  private

  def callback_from(provider)
    @user = User.find_for_oauth(request.env['omniauth.auth'].delete_if { |k, _v| k == 'extra' })
    if @user.instance_of?(User)
      flash[:notice] = t('devise.omniauth_callbacks.success', kind: provider.to_s.capitalize)
      sign_in @user, event: :authentication
      redirect_to ENV.fetch('FRONTEND_URL', 'http://localhost:5173'), allow_other_host: true
    else
      session["devise.#{provider}_data"] = request.env['omniauth.auth'].credentials.id_token
      redirect_to new_user_registration_path, alert: @user
    end
  end
end
