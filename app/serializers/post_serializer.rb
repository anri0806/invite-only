
class PostSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :caption, :user_id, :created_at, :picture, :posted_by, :group_id

  belongs_to :user

  # def picture_url
    # return unless object.picture.attached?
    # object.picture.blob.attributes
    #   .slice('filename', 'byte_size', 'id')
    #   .merge(url: picture_url(object.picture))
  # end

  def picture
    rails_blob_path(object.picture, only_path: true) if object.picture.attached?
  end

  def posted_by
    object.user.username
  end

  def group_id
    object.user.group_id
  end

end