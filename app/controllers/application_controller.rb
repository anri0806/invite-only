class ApplicationController < ActionController::API
  include ActionController::Cookies
  respond_to :json

  def root
    if Rails.env.development?

      # For urls in email
      Rails.action_mailer.default_url_options = { host: 'localhost', port: 4000 }

      # absolute urls with routing url helpers.
      # Rails.application.routes.default_url_options ={host: 'localhost:3000', protocol: 'http' }
      # Rails.application.routes.default_url_options = { host: 'localhost:3000', protocol: 'http' }
      # config.routes.default_url_options  or  config.routes.default_url_options[:host] = 'example.com'

    end
  end

  # before_action :authorize

  # private

  # def authorize
  #   return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
  # end

end
