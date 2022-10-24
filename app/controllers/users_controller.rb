class UsersController < ApplicationController
    # skip_before_action :authorize, only: [:show]

    def index
        users = User.all
        render json: users
    end


    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def get_users
        users = User.where(group_id: params[:id])
        render json: users, status: :ok
    end

end
