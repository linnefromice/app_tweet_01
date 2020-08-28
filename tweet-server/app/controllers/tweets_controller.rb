class TweetsController < ApplicationController
  def show
    if params[:user_id]
      @tweets = User.find(params[:user_id]).tweets.eager_load(:user).select("tweets.*, users.name").order(id: :desc)
    else
      @tweets = Tweet.eager_load(:user).select("tweets.*, users.name").order(id: :desc)
    end
    render json: @tweets
  rescue ActiveRecord::RecordNotFound
    render json: Tweet.eager_load(:user).select("tweets.*, users.name").order(id: :desc)
  end

  def detail
    if params[:id]
      render json: Tweet.eager_load(:user).select("tweets.*, users.name").find(params[:id])
    else
      render json: { errors: ["Get details Failed ..."] }, status: 400
    end
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Get details Failed ..."] }, status: 400
  end

  def create
    if params[:user_id]
      User.find(params[:user_id]).tweets.create!(sentence: params[:sentence])
    end
  end

  def update
    @tweet = Tweet.find(params[:id])
    @tweet.update_attributes(sentence: params[:sentence])
    render json: @tweet
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Update Failed ..."] }, status: 400
  end

  def delete
    @tweet = Tweet.find(params[:id])
    if @tweet.destroy
      head :no_content, status: :ok
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Delete Failed ..."] }, status: 400
  end

  def destroy
    # do nothing.
  end
end
