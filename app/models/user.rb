class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  belongs_to :group

  has_many :commented_posts, foreign_key: "user_id", class_name: "Post", dependent: :destroy
     
  has_many :comments
  has_many :posts, through: :comments

  has_one_attached :avatar, dependent: :destroy
     
  attr_accessor :invitation_instructions

def self.invite_guest!(attributes={}, invited_by=nil)
 self.invite!(attributes, invited_by) do |invitable|
   invitable.invitation_instructions = :guest_invitation_instructions
 end
end

end
