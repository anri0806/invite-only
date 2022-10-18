class UsersInvitationsController < Devise::InvitationsController
    respond_to :json

    def create
        new_user = User.invite_guest!(invite_params)
        ## new_user.invitation_token => in serializer, 
        ## new_user.raw_invitation_token => in url

        if new_user.valid?
           render json: new_user, status: :ok
        else 
            render json: { error: "Error!!!"}, status: :unprocessable_entity
        end
    end

  
      def update
        # find new user by invitation_token
        # new_user = User.find_by_invitation_token(params[:invitation_token], true)

        # update user data
        new_user = User.accept_invitation!(invitation_token: params[:invitation_token], username: params[:user][:username], password: params[:user][:password], admin: params[:user][:admin])

        if new_user.valid?
          render json: new_user, status: :ok
        else
          render json: {error: "Couldn't update user."}, status: :unprocessable_entity
        end
       
        # super do |resource|
        #   if resource.errors.empty?
        #     render json: { status: "Invitation Accepted!" }, status: 200 and return
        #   else
        #     render json: resource.errors, status: 401 and return
        #   end
        # end
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
