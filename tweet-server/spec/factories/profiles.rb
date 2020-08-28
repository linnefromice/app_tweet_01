FactoryBot.define do
  factory :profile do
    association :user, factory: :user
    description { "This service's administrator / Please ask me anything！" }
    age { 25 }
    birthday { "January, 2000" }
    company { "TweetApp, Inc." }
    location { "Tokyo" }
  end
end
