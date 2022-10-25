class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :email, :admin, :group_id, :avatar, :created_at, :group_name
  
  def group_name
    object.group.group_name
  end

  def avatar
    # rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
    
    if object.avatar.attached?
      rails_blob_path(object.avatar, only_path: true)
    else 
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    end 

  end


end
