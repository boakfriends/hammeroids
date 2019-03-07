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
    let(:name) { Faker::Name.name }

    context "with params" do
      let(:params) do
        { name: name }
      end

      it "is successful" do
        post path, params: params
        expect(last_response.successful?).to eql true
      end

      it "is contains player name data attribute" do
        post path, params
        expect(last_response.body).to include name
      end

      it "contains the socket base URL" do
        post path, params
        expect(last_response.body).to include Hammeroids::Settings.base_socket_url
      end
    end
  end
end
