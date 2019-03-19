require "spec_helper"

RSpec.describe Hammeroids::Sockets::MessageRouter do
  describe "#action" do
    subject { described_class.new(connection, message).action }

    context "connection" do
      let(:connection) { double("EventMachine::Connection") }

      context "valid message class" do
        let(:message) do
          JSON.generate(
            {
              "type" => "player_name",
              "method" =>
                {
                  "name" => "update",
                  "args" => {
                    "name" => "rudiger"
                  }
                }
            }
          )
        end

        let(:mock_messages_name) { instance_double(Hammeroids::Sockets::Messages::PlayerName, update: nil) }

        before do
          allow(Hammeroids::Sockets::Messages::PlayerName).to receive(:new).with(connection).and_return(mock_messages_name)
        end

        it "should call the right class" do
          subject
          expect(mock_messages_name).to have_received(:update).with(name: "rudiger")
        end
      end

      context "invalid message class" do
        let(:message) do
          JSON.generate(
            {
              "type" => "boak",
              "method" =>
                {
                  "name" => "update",
                  "args" => {
                    "name" => "rudiger"
                  }
                }
            }
          )
        end

        it "does nothing" do
          expect { subject }.not_to raise_error
        end
      end
    end
  end
end
