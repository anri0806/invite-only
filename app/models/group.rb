class Group < ApplicationRecord
    has_many :users, dependent: :destroy
    has_many :posts
    has_many :comments


    validates :group_name, length: {maximum: 40}, presence: true
end
