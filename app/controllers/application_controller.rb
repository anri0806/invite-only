class ApplicationController < ActionController::API
  include ActionController::Cookies
  respond_to :json

  def root
    if Rails.env.development?
      Rails.application.routes.default_url_options = { host: 'localhost:4000', protocol: 'http' }
    end
  end

  # before_action :authorize

  # private

  # def authorize
  #   return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
  # end

end
