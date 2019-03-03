require 'spec_helper'


RSpec.describe Hammeroids::Player do
  describe '.create' do
    subject { described_class.create(id) }

    context "new player" do
      let(:mock_redis) { instance_double("Redis", lpush: nil) }
      let(:id) { Faker::Number.between(1, 100) }

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
    subject { described_class.new(id).create }
    let(:id) { Faker::Number.between(1, 100) }

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
    subject { described_class.new(id).id }
    let(:id) { Faker::Number.between(1, 100) }

    it "returns ID" do
      expect(subject).to eq id
    end
  end

  describe '#to_h' do
    subject { described_class.new(id, name: name).to_h }
    let(:id) { Faker::Number.between(1, 100) }

    context "with name" do
      let(:name) { Faker::Name.name }

      it "returns a JSON serialised player" do
        expect(subject).to include(name: name)
      end
    end
  end

  describe '#to_json' do
    subject { described_class.new(id, name: name).to_json }
    let(:id) { Faker::Number.between(1, 100) }

    context "with name" do
      let(:name) { Faker::Name.name }

      it "returns a JSON serialised player" do
        expect(subject).to include name
        expect(subject).to include id.to_s
      end

      it "serialises to JSON String" do
        expect(subject).to be_an_instance_of(String)
      end
    end
  end
end
