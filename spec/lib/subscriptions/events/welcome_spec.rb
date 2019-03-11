require 'spec_helper'

RSpec.describe Hammeroids::Subscriptions::Events::Welcome do
  describe "#create" do
    subject { described_class.new(connection, id).create }

    context "subscribed" do
      let(:connection) { instance_double(EventMachine::WebSocket::Connection, send: nil) }

      let(:id) { Faker::Number.between(1, 100) }

      it "should send the JSON" do
        subject
        expect(connection).to have_received(:send).with("{\"type\":\"welcome\",\"id\":#{id}}")
      end
    end
  end
end
