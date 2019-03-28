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

  describe "#update(attributes)" do
    subject { described_class.new.update(attributes) }

    context "attributes" do
      let(:attributes) do
        { name: name }
      end

      context "name" do
        let(:name) { Faker::TvShows::RickAndMorty.character }

        context "not in  lobby" do
          let(:mock_redis) { instance_double("Redis", sadd: 1) }

          before do
            allow(Redis).to receive(:new).and_return(mock_redis)
          end

          it "adds player JSON to players set, returns number of sets added" do
            expect(subject).to eq 1
            expect(mock_redis).to have_received(:sadd).with("players", include(name))
          end
        end
      end
    end
  end
end
