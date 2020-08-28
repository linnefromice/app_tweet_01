require 'rails_helper'

RSpec.describe UserUrl, type: :model do
  describe "# about model's field" do
    let!(:url) { create(:url) }
    context 'when with minimum data' do
      it 'should be valid' do
        expect(url).to be_valid
      end
    end
    context '"サイト名"が存在しないとき' do
      before { url.site_name = nil }
      it 'should be invalid' do
        expect(url).to be_invalid
      end
    end
    context '"URL"が存在しないとき' do
      before { url.url = nil }
      it 'should be invalid' do
        expect(url).to be_invalid
      end
    end
  end
end
