require 'spec_helper'

RSpec.describe Hammeroids::Player do
  describe '#create' do
    subject { described_class.new.create }

    context "new player" do
      let(:mock_redis) { instance_double("Redis", lpush: nil) }

      before do
        allow(Redis).to receive(:new).and_return(mock_redis)
      end

      it "pushes player UUID into redis list" do
        subject
        expect(mock_redis).to have_received(:lpush)
      end
    end
  end

  describe '#name' do
    subject { described_class.new.name }

    it "returns a player name with UUID" do
      expect(subject).to match(/player\_[a-z0-9\-]{36}/)
    end
  end
end
