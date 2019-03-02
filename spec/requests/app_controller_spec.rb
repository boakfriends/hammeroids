require 'spec_helper'

RSpec.describe "Hammeroids::App", type: :request do
  describe 'GET /join' do
    let(:path) { '/' }

    it 'is successful' do
      get path
      expect(last_response.successful?).to eql true
    end
  end

  describe "POST /game" do
    let(:path) { "/game" }
    let(:name) {Faker::Name.name}
    let(:mock_player) { instance_double("Hammeroids::Player", id: SecureRandom.uuid, name: name) }

    before do
      allow(Hammeroids::Player).to receive(:create).and_return(mock_player)
    end

    context "with params" do
      let(:params) do
        { name: name }
      end

      it "is successful" do
        post path, params: params
        expect(last_response.successful?).to eql true
      end

      it "is contains player UUID data attribute" do
        post path, params: params
        expect(last_response.body).to match(/data\-player\-uuid\=\"[a-z0-9\-]{36}\"/)
      end

      it "is contains player name data attribute" do
        post path, params: params
        expect(last_response.body).to include name
      end
    end
  end
end
