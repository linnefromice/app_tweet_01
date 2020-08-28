require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe "# about model's field" do
    let!(:profile) { create(:profile) }
    context 'when with minimum data' do
      it 'should be valid' do
        expect(profile).to be_valid
      end
    end
  end
end
