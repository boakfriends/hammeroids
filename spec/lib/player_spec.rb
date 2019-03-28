require "spec_helper"

RSpec.describe Hammeroids::Player do
  describe ".all" do
    subject { described_class.all }

    context "players in set" do
      let(:mock_redis) { instance_double("Redis", smembers: set) }
      let(:set) do
        [
          "{\"name\":\"#{Faker::TvShows::RickAndMorty.character}\"}",
          "{\"name\":\"#{Faker::TvShows::RickAndMorty.character}\"}"
        ]
      end

      before do
        allow(Redis).to receive(:new).and_return(mock_redis)
      end

      it "fetches players set from redis" do
        expect(subject).to contain_exactly(hash_including("name" => kind_of(String)), hash_including("name" => kind_of(String)))
        expect(mock_redis).to have_received(:smembers).with("players")
      end
    end
  end

  describe "attributes" do
    subject { described_class.new(attributes) }

    let(:attributes) do
      {
        id: Faker::Number.between(1,10),
        name: Faker::TvShows::RickAndMorty.character
      }
    end

    describe "#id" do
      it "is not nil" do
        expect(subject.id).not_to be_nil
      end
    end

    describe "#id=(id)" do
      let(:id) { Faker::Number.between(1,10) }

      it "sets new id" do
        subject.id = id
        expect(subject.id).to eql id
      end
    end

    describe "#name" do
      it "is not nil" do
        expect(subject.id).not_to be_nil
      end
    end

    describe "#name=(name)" do
      let(:name) { Faker::TvShows::RickAndMorty.character }

      it "sets new name" do
        subject.name = name
        expect(subject.name).to eql name
      end
    end
  end

  describe "#delete" do
    subject { described_class.new.delete }

    context "in lobby" do
      let(:mock_redis) { instance_double("Redis", srem: 1) }

      before do
        allow(Redis).to receive(:new).and_return(mock_redis)
      end

      it "removes player JSON from players set" do
        subject
        expect(mock_redis).to have_received(:srem).with("players", kind_of(String))
      end
    end
  end

  describe "#save" do
    subject { described_class.new(attributes).save }

    context "attributes" do
      let(:attributes) do
        { id: id, name: name }
      end

      context "id and name" do
        let(:name) { Faker::TvShows::RickAndMorty.character }
        let(:id) { Faker::Number.between(1, 10) }

        context "not in  lobby" do
          let(:mock_redis) { instance_double("Redis", sadd: 1) }

          before do
            allow(Redis).to receive(:new).and_return(mock_redis)
          end

          it "adds player JSON to players set, returns number of sets added" do
            expect(subject).to eq 1
            expect(mock_redis).to have_received(:sadd).with("players", include("{\"id\":#{id},\"name\":\"#{name}\"}"))
          end
        end
      end
    end
  end
end
