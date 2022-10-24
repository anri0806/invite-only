class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin, :group_id, :created_at, :group_name
  
  def group_name
    object.group.group_name
  end

end
