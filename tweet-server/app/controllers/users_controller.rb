class UsersController < ApplicationController
  def sign_up
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: 400
    end
  end

  def sign_in
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      render json: @user
    else
      render json: { errors: ["Sign-in Failed ..."] }, status: 401
    end
  end

  def show
    if params[:user_id]
      @users = User.find(params[:user_id])
    else
      @users = User.all
    end
    render json: @users
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Get users Failed ..."] }, status: 400
  end

  def detail
    if params[:id]
      @user = User.find(params[:id])
      render json: create_response(@user)
    else
      render json: { errors: ["Get details Failed ..."] }, status: 400
    end
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Get details Failed ..."] }, status: 400

  end

  private
  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def create_response(user)
    res = {
        id: user.id,
        name: user.name,
        email: user.email,
        following: @user.following.ids,
        followers: @user.followers.ids,
        description: "",
        urls: {}
    }
    res[:description] = user.profile.description if user.profile
    if user.user_urls
      user.user_urls.map { |user_url| res[:urls][user_url.site_name] = user_url.url }
    end
    res
  end
end
