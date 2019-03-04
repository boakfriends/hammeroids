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

  describe "#to_h" do
    subject { described_class.new.to_h }
    let(:mock_redis) { instance_double("Redis", lrange: JSON.generate(players)) }
    let(:players) do
      (1..10).map { |id| { id: id, name: Faker::RickAndMorty.character } }
    end

    before do
      allow(Redis).to receive(:new).and_return(mock_redis)
    end

    it "returns an hash containing lobby data" do
      expect(subject).to eq(type: "lobby", payload: { players: players })
    end
  end
end
