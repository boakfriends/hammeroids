require "spec_helper"

RSpec.describe Hammeroids::Channels::Subscription do
  describe "#create" do
    subject { described_class.new(connection, channel).create }

    context "connection and channel" do
      let(:connection) { instance_double("EventMachine::Connection", send: nil) }
      let(:channel) { instance_double("EM::Channel", subscribe: subscription_id) }

      context "successful" do
        let(:subscription_id) { Faker::Number.between(1, 10) }

        it "returns the subscription ID" do
          expect(subject).to eq subscription_id
        end

        it "send welcome event to connection" do
          subject
          expect(connection).to have_received(:send).with(/welcome/)
        end
      end
    end
  end
end
