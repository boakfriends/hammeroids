require 'spec_helper'

RSpec.describe Hammeroids::Lobby do
  describe '#clear' do
    subject { described_class.new.clear }
    let(:mock_redis) { instance_double("Redis", del: nil) }

    before do
      allow(Redis).to receive(:new).and_return(mock_redis)
    end

    it "deletes the players list key" do
      subject
      expect(mock_redis).to have_received(:del).with("players")
    end
  end

  describe "#to_json" do
    subject { described_class.new.to_json }
    let(:mock_redis) { instance_double("Redis", lrange: players) }
    let(:players) do
      (1..10).map { |id| JSON.generate("id" => id, "name" => Faker::RickAndMorty.character) }
    end
    let(:parsed_subject) { JSON.parse(subject) }

    before do
      allow(Redis).to receive(:new).and_return(mock_redis)
    end

    it "contains correct keys" do
      expect(parsed_subject.keys).to include("type", "payload")
    end

    it "payload contains array of players" do
      players = parsed_subject.dig("payload", "players")
      expect(players).to include(hash_including("id", "name"))
    end
  end
end
