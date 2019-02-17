require 'spec_helper'

RSpec.describe Hammeroids::Player do
  describe '.create' do
    subject { described_class.create }

    context "new player" do
      let(:mock_redis) { instance_double("Redis", lpush: nil) }

      before do
        allow(Redis).to receive(:new).and_return(mock_redis)
      end

      it "returns instance of created player" do
        expect(subject).to be_an_instance_of(Hammeroids::Player)
      end

      it "stores player in redis" do
        subject
        expect(mock_redis).to have_received(:lpush)
      end
    end
  end

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

  describe '#id' do
    subject { described_class.new.id }

    it "returns UUID" do
      expect(subject).to match(/[a-z0-9\-]{36}/)
    end
  end

  describe '#to_h' do
    subject { described_class.new(name: name).to_h }

    context "with name" do
      let(:name) { Faker::Name.name }

      it "returns a JSON serialised player" do
        expect(subject).to include(name: name)
      end
    end
  end

  describe '#to_json' do
    subject { described_class.new(name: name).to_json }

    context "with name" do
      let(:name) { Faker::Name.name }

      it "returns a JSON serialised player" do
        expect(subject).to include name
      end

      it "serialises to JSON String" do
        expect(subject).to be_an_instance_of(String)
      end
    end
  end
end
