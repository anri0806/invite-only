class UsersInvitationsController < Devise::InvitationsController
    respond_to :json

    def create
        new_user = User.invite_guest!(invite_params)
        ## new_user.invitation_token => in serializer, 
        ## new_user.raw_invitation_token => in url

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

    # def edit
    #     sign_out send("current_#{resource_name}") if send("#{resource_name}_signed_in?")
    #     set_minimum_password_length
    #     resource.invitation_token = params[:invitation_token]
    #     redirect_to "http://localhost:4000/users/invitation/accept?invitation_token=#{params[:invitation_token]}"
    # end

    private

    def invite_params
        params.permit(:email, :group_id, :username, :admin, :invitation_token)
        # params.require(:user).permit(:email)
        # params.fetch(:user, {}).permit(:email)
    end

end
