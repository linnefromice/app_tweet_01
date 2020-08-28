class CreateUserUrls < ActiveRecord::Migration[6.0]
  def change
    create_table :user_urls do |t|
      t.references :user, null: false, foreign_key: true
      t.string :site_name
      t.string :url

      t.timestamps
    end
  end
end
