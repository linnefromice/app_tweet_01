class UserUrl < ApplicationRecord
  belongs_to :user

  validates :site_name, { presence: true }
  validates :url, { presence: true }
end
