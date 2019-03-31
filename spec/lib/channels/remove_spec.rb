require "spec_helper"

RSpec.describe Hammeroids::Channels::Remove do
  describe "#broadcast" do
    subject { described_class.new(channel, id).broadcast }

    context "channel" do
      let(:channel) { instance_double("EM::Channel", push: nil) }
      let(:id) { Faker::Number.number(1).to_i }

      it "pushes remove JSON to channel" do
        subject
        expect(channel).to have_received(:push).with("{\"type\":\"remove\",\"payload\":{\"id\":#{id}}}")
      end
    end
  end
end
