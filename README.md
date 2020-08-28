# app_tweet_01

- Tweetアプリ
  - Frontend ... React
  - Backend ... Ruby on Rails

## 構築メモ

### tweet-server

- initilizing

```text
mkdir tweet-server
cd tweet-server
bundle init
# Gemfile の rails をコメントアウトして、バージョン指定
## gem "rails", "~> 6.0.0"
bundle install --path vendor/bundle
bundle exec rails new . --api
gibo dump Rails JetBrains >> .gitignore
```

- create models / controller

```text
bin/rails g model User name:string email:string password_digest:string
bin/rails g model Tweet sentence:string user:references
# Gemfile の bcrypt をコメントアウト
# bin/rails console
## User.new(name: "admin", email: "admin@example.com", password: "password").save
### CONFIRM -> User.first.authenticate("password")
bin/rails generate controller Tweets
bin/rails db:seed
bin/rails g model FollowRelationship follower_id:integer followed_id:integer
bin/rails g controller FollowRelationship
bin/rails g model Profile user:references description:string age:int birthday:string company:string location:string
bin/rails g model UserUrl user:references site_name:string url:string
```

- add test framework (rspec)

```text
# Gemfileを追記
group :development, :test do
  ...
  gem "rspec-rails"
  gem "factory_bot_rails"
  ...
end

bundle install
bin/rails generate rspec:install
```

### tweet-client

- initializing

```text
npx create-react-app tweet-client --template typescript
cd tweet-client
yarn add axios
yarn add react-router-dom
yarn add styled-components
yarn add @types/styled-components
yarn add @types/react-router-dom
gibo dump Node VisualStudioCode >> .gitignore
```

## 参考

- [Rails のモデル（フォーム）でパスワードを暗号化して保存する方法 - Qiita](https://qiita.com/ryosuketter/items/805452b7e6bf9637cb57)
- [ActiveRecordで1対他の関連付けマイグレーションを作成する - Qiita](https://qiita.com/yukihigasi/items/467b68f7f60463202a6e)
- [Rails5 APIモードでつくるかんたんなトークンベース認証 - 大草原](https://dev.m6a.jp/entry/2018/11/14/162259)
- [RailsアプリへのRspecとFactory_botの導入手順 - Qiita](https://qiita.com/Ushinji/items/522ed01c9c14b680222c)