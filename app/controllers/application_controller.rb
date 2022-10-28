class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json
  

  # def root
  #   if Rails.env.development?
  #     # For urls in email
  #     Rails.action_mailer.default_url_options = { host: 'localhost', port: 4000 }
  #   end
  # end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password, :group_id, :admin])
  end
  
end
