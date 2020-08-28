FactoryBot.define do
  factory :url, class: UserUrl do
    association :user, factory: :user
    site_name { "sample-site" }
    url { "https://sample-site.com" }
  end

  factory :portfolio_url, class: UserUrl do
    association :user, factory: :user
    site_name { "portfolio" }
    url { "https://linnefromice-portfolio.web.app" }
  end

  factory :facebook_url, class: UserUrl do
    association :user, factory: :user
    site_name { "facebook" }
    url { "https://www.facebook.com/facebookappJapan" }
  end

  factory :instagram_url, class: UserUrl do
    association :user, factory: :user
    site_name { "instagram" }
    url { "https://www.instagram.com/instagram" }
  end
end
