require 'rails_helper'

RSpec.describe 'UsersController', type: :request do
  describe 'POST /sign_in' do
    let!(:user) { create(:user) }
    context 'メールアドレス/パスワードが正しい時' do
      before do
        @sign_in_params = { email: user.email, password: user.password }
      end
      it 'リクエストが成功すること' do
        post sign_in_path, params: @sign_in_params
        expect(response.status).to eq 200
      end
    end

    context 'パスワードが正しくない時' do
      before do
        @sign_in_params = { email: user.email, password: user.password + "xyz" }
      end
      it 'リクエストが失敗すること' do
        post sign_in_path, params: @sign_in_params
        expect(response.status).to eq 401
      end
    end

    context '存在しないユーザのメールアドレスを指定したとき' do
      before do
        @sign_in_params = { email: 'error@error.err', password: user.password }
      end
      it 'リクエストが失敗すること' do
        post sign_in_path, params: @sign_in_params
        expect(response.status).to eq 401
      end
    end
  end

  describe 'POST /sign_up' do
    context '正しいパラメータを指定したとき' do
      before do
        @sign_up_params = {
            name: "sign_up_user",
            email: "sign_up_user@example.com",
            password: "sign_in_user_password",
            password_confirmation: "sign_in_user_password",
        }
      end
      it 'リクエストが成功すること' do
        post sign_up_path, params: @sign_up_params
        expect(response.status).to eq 200
      end
    end
  end

  describe 'GET /users' do
    let(:user) { create(:user) }
    context 'パラメータを指定しなかったとき' do
      it 'リクエストが成功すること' do
        get users_path
        expect(response.status).to eq 200
      end
    end

    context '存在するユーザのIDを指定したとき' do
      before do
        @params = { user_id: user.id }
      end
      it 'リクエストが成功すること' do
        get users_path, params: @params
        expect(response.status).to eq 200
      end
    end

    context '存在しないユーザのIDを指定したとき' do
      before do
        @params = { user_id: 0 }
      end
      it 'リクエストが失敗すること' do
        get users_path, params: @params
        expect(response.status).to eq 400
      end
    end
  end

  describe 'GET /users/detail/:id' do
    let!(:user ) { create(:user) }
    context '存在するユーザーIDを指定したとき' do
      let!(:user_id) { user.id }
      it 'リクエストが成功すること' do
        get "/users/detail/#{user_id}"
        expect(response.status).to eq 200
      end
    end

    context '指定したユーザーIDに紐づくユーザーが存在しないとき' do
      let!(:user_id) { 0 }
      it 'リクエストが失敗すること' do
        get "/users/detail/#{user_id}"
        expect(response.status).to eq 400
      end
    end
  end
end
