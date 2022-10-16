class GroupSerializer < ActiveModel::Serializer
  attributes :id, :group_name, :how_many_members, :members

  def how_many_members
    self.object.users.count
  end

  def members
    object.users.pluck(:username)
  end
end
