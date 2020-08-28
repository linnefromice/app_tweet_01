class User < ApplicationRecord
  VALID_EMAIL_REGAX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  has_many :active_relationships, class_name: FollowRelationship.name, foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: FollowRelationship.name, foreign_key: "followed_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :tweets
  has_one :profile
  has_many :user_urls
  has_secure_password

  validates :name, { presence: true }
  validates :email, { presence: true, format: { with: VALID_EMAIL_REGAX }, uniqueness: { case_sensitive: false} }
end
