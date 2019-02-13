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

  describe '#to_h' do
    subject { described_class.new.to_h }
    let(:mock_redis) { instance_double("Redis", lrange: player_uuids) }
    let(:player_uuids) { [SecureRandom.uuid]*2 }

    before do
      allow(Redis).to receive(:new).and_return(mock_redis)
    end

    it "returns a hash containing players" do
      expect(subject).to include(players: player_uuids)
    end
  end

  describe '#to_json' do
    subject { described_class.new.to_json }
    let(:mock_redis) { instance_double("Redis", lrange: player_uuids) }
    let(:player_uuids) { [SecureRandom.uuid]*2 }

    before do
      allow(Redis).to receive(:new).and_return(mock_redis)
    end

    it "includes player data in JSON String" do
      expect(subject).to include *player_uuids
    end

    it "serialises to JSON String" do
      expect(subject).to be_an_instance_of(String)
    end
  end
end
