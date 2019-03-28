require "spec_helper"

RSpec.describe Hammeroids::Channels::Lobby do
  describe "#broadcast" do
    subject { described_class.new(channel).broadcast }

    context "channel" do
      let(:channel) { instance_double("EM::Channel", push: nil) }
      let(:name) { Faker::TvShows::RickAndMorty.character }
      let(:players) do
        [
          { "name": name }
        ]
      end

      before do
        allow(Hammeroids::Player).to receive(:all).and_return(players)
      end

      it "pushes lobby JSON to channel" do
        subject
        expect(channel).to have_received(:push).with("{\"type\":\"lobby\",\"payload\":{\"players\":[{\"name\":\"#{name}\"}]}}")
      end
    end
  end
end
