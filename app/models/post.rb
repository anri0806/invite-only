class Post < ApplicationRecord
    belongs_to :user, foreign_key: :user_id, class_name: "User"
    belongs_to :group

    # has_many :comments, dependent: :destroy
    # has_many :users, through: :comments

    has_one_attached :picture
    
    validates :caption, length: {maximum: 100}, presence: true
end
