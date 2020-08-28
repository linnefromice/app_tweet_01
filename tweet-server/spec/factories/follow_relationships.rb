FactoryBot.define do
  factory :follow_relationship do
    association :follower, factory: :follower_user
    association :followed, factory: :followed_user
  end
end
