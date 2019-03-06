require 'spec_helper'


RSpec.describe Hammeroids::Player do
  describe "#join" do
    subject { described_class.new(connection, channel, name: name).join }
    let(:mock_redis) { instance_double("Redis", lpush: nil) }
    let(:connection) { instance_double("EventMachine::WebSocket::Connection") }
    let(:channel) { instance_double("EventMachine::Channel") }
    let(:mock_subscription) { instance_double("Hammeroids::Players::Subscription", create: subscription_id) }

    context "successful subscription" do
      let(:subscription_id) { Faker::Number.between(1, 100) }

      before do
        allow(Hammeroids::Players::Subscription).to receive(:new).and_return(mock_subscription)
        allow(Redis).to receive(:new).and_return(mock_redis)
      end

      context "name" do
        let(:name) { Faker::RickAndMorty.character }

        it "creates connection and adds player to lobby" do
          subject
          expect(mock_redis).to have_received(:lpush).with("players", include(subscription_id.to_s, name))
        end
      end
    end
  end

  describe "#leave" do
    subject { described_class.new(connection, channel, name: name).leave}
    let(:mock_redis) { instance_double("Redis", lrem: nil) }
    let(:connection) { instance_double("EventMachine::WebSocket::Connection") }
    let(:channel) { instance_double("EventMachine::Channel") }
    let(:mock_subscription) { instance_double("Hammeroids::Players::Subscription", create: subscription_id) }

    context "already subscribed" do
      let(:subscription_id) { Faker::Number.between(1, 100) }

      before do
        allow(Hammeroids::Players::Subscription).to receive(:new).and_return(mock_subscription)
        allow(Redis).to receive(:new).and_return(mock_redis)
      end

      context "name" do
        let(:name) { Faker::RickAndMorty.character }

        it "Removes the player JSON from redis players list" do
          subject
          expect(mock_redis).to have_received(:lrem).with("players", 0, include(subscription_id.to_s, name))
        end
      end
    end
  end
end
