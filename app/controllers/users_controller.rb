class UsersController < ApplicationController
    # skip_before_action :authorize, only: [:index, :create]

    def index
        users = User.all
        render json: users
    end

    def get_users
        users = User.where(group_id: params[:id])
        render json: users, status: :ok
    end

end
