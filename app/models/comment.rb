class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :post
    belongs_to :group


    validates :content, length: {maximum: 100}, presence: true

end
