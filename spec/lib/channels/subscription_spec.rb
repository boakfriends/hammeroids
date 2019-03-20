require "spec_helper"

RSpec.describe Hammeroids::Channels::Subscription do
  describe "#create" do
    subject { described_class.new(connection, channel).create }

    context "connection and channel" do
      let(:connection) { instance_double("EventMachine::Connection", send: nil) }
      let(:channel) { instance_double("EM::Channel", subscribe: Faker::Number.between(1, 10)) }

      it "returns the connection" do
        expect(subject).to eq connection
      end

      it "send welcome event to connection" do
        subject
        expect(connection).to have_received(:send).with(/welcome/)
      end
    end
  end
end
