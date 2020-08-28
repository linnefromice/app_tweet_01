# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
admin = User.create({name: "admin", email: "admin@example.com", password: "password"})
moguo = User.create({name: "モグオ", email: "moguo@mognet.com", password: "password"})
zidane = User.create({name: "ジタン", email: "zidane@mognet.com", password: "password"})
admin.tweets.create([
   { sentence: "ユーザー構築ありがとう！" },
   { sentence: "このアプリで日々のつぶやきをたくさんしてください！" },
   { sentence: "僕らはあなたの最初のつぶやきを待っています...是非Tweetしてください！" },
])
moguo.tweets.create([
   { sentence: "何かご用クポ？" },
   { sentence: "いいかげんにするクポ～" },
   { sentence: "用もないのに呼ぶのは困るクポ！" },
   { sentence: "そろそろやめるクポよ～" },
   { sentence: "いたずらに呼びすぎクポッ、ぷふぇっ！" },
])
zidane.tweets.create([
    { sentence: "それでは 王女さま 今から、わたくしめが あなた様を誘拐させていただきます" },
    { sentence: "助かったんじゃないさ 生きようとしたんだ いつか帰るところに帰るために" },
    { sentence: "誰かを助けるのに理由がいるかい？" },
    { sentence: "勝負がついてもお互いの命があったんだ。それで充分だろ？" },
])
admin.create_profile({
    description: "This service's administrator / Please ask me anything！",
    location: "Global"
})
moguo.create_profile({
    description: "Moogle / Helping travelers to provide save point & rest",
    birthday: "unknown",
    location: "unknown"
})
zidane.create_profile({
    description: "Thief / Actor of Tantalus Theater Troupe",
    age: 16,
    birthday: "September, 1783",
    location: "Lindblum",
})
admin.user_urls.create([
   { site_name: "portfolio", url: "https://linnefromice-portfolio.web.app" },
   { site_name: "facebook", url: "https://www.facebook.com/facebookappJapan" },
   { site_name: "instagram", url: "https://www.instagram.com/instagram" },
])
zidane.user_urls.create([
   { site_name: "portfolio", url: "https://www.jp.square-enix.com/ff9/characters/zidane.html" },
])
FollowRelationship.create({ follower_id: zidane.id, followed_id: admin.id })
FollowRelationship.create({ follower_id: moguo.id, followed_id: admin.id })
FollowRelationship.create({ follower_id: moguo.id, followed_id: zidane.id })
