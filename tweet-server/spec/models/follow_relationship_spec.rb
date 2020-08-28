require 'rails_helper'

RSpec.describe FollowRelationship, type: :model do
  describe "# about model's field" do
    let!(:follow_relationship) { create(:follow_relationship) }
    context 'when with minimum data' do
      it 'should be valid' do
        expect(follow_relationship).to be_valid
      end
    end

    context '"follower_id"が存在しないとき' do
      before { follow_relationship.follower_id = nil }
      it 'should be invalid' do
        expect(follow_relationship).to be_invalid
      end
    end

    context '"followed_id"が存在しないとき' do
      before { follow_relationship.followed_id = nil }
      it 'should be invalid' do
        expect(follow_relationship).to be_invalid
      end
    end

  end

end
