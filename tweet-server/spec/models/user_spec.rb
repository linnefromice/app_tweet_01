# frozen_string_literal: true
require 'rails_helper'

RSpec.describe "User" do
  describe "# about model's field" do
    let!(:user) { create(:user) }
    context 'when with minimum data' do
      it 'should be valid' do
        expect(user).to be_valid
      end
    end

    context '"名前"が存在しないとき' do
      before { user.name = nil }
      it 'should be invalid' do
        expect(user).to be_invalid
      end
    end

    context '"メールアドレス"が存在しないとき' do
      before { user.email = nil }
      it 'should be invalid' do
        expect(user).to be_invalid
      end
    end

    context '"パスワード"が存在しないとき' do
      before { user.password = nil }
      it 'should be invalid' do
        expect(user).to be_invalid
      end
    end
  end
end
