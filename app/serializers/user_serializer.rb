class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin, :group_id, :created_at
end
