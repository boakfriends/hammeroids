require 'spec_helper'

RSpec.describe Hammeroids::Player do
  describe '#to_json' do
    subject { described_class.new(ws, name: name).to_json }

    context 'socket' do
      let(:ws) { instance_double('Faye::WebSocket', object_id: SecureRandom.uuid) }

      context 'name' do
        let(:name) { Faker::Simpsons.character }

        it 'should return a String' do
          expect(subject).to be_kind_of(String)
        end

        it 'should contain name and WS object' do
          player_json = JSON.parse(subject)
          expect(player_json.keys).to include 'name', 'ws'
        end
      end
    end
  end
end
