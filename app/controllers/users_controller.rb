class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


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

    def update
        user = User.find_by(id: params[:id])
        
        if user
            user.update!(user_params)
            render json: user, status: :created           
        else
            render json: {errors: "User not found"}, status: :not_found
        end
    end

    private

    def user_params
        params.permit(:username, :email, :avatar)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end


end
