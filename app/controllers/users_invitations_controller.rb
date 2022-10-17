class UsersInvitationsController < Devise::InvitationsController
    respond_to :json

    def create
        
        new_user = User.invite_guest!(invite_params)
        
        if new_user.valid?
           render json: new_user, status: :ok
        else 
            render json: { error: "Error!!!"}, status: :unprocessable_entity
        end
    end

    def edit
        sign_out send("current_#{resource_name}") if send("#{resource_name}_signed_in?")
        set_minimum_password_length
        resource.invitation_token = params[:invitation_token]
        redirect_to "http://localhost:4000/users/invitation/accept?invitation_token=#{params[:invitation_token]}"
      end
    
      def update
        super do |resource|
          if resource.errors.empty?
            render json: { status: "Invitation Accepted!" }, status: 200 and return
          else
            render json: resource.errors, status: 401 and return
          end
        end
      end

    private

    def invite_params
        params.permit(:email, :group_id)
        # params.require(:user).permit(:email)
        # params.fetch(:user, {}).permit(:email)
    end

end
