class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :post_id, :created_at, :group_id, :posted_by

  belongs_to :user
  
  def posted_by
    object.user.username
  end

end
