class UsersInvitationsController < Devise::InvitationsController
    respond_to :json

    def create
        new_user = User.invite_guest!(invite_params)

        if new_user.valid?
           render json: new_user, status: :ok
        else 
            render json: { error: new_user.errors.full_messages}, status: :unprocessable_entity
        end
    end

  
      def update
        # find new user by invitation_token
        # new_user = User.find_by_invitation_token(params[:invitation_token], true)

        # update user data
        new_user = User.accept_invitation!(invitation_token: params[:invitation_token], username: params[:user][:username], password: params[:user][:password], password_confirmation: params[:user][:password_confirmation], admin: params[:user][:admin])

        if new_user.valid?
          session[:user_id] = new_user.id
          render json: new_user, status: :ok
        else
          render json: { errors: new_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    private

    def invite_params
        params.permit(:email, :group_id, :username, :admin, :invitation_token)
    end

end
