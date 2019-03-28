module Hammeroids
  module Channels
    # Broadcasts list of players to channel
    class Lobby
      def initialize(channel)
        @channel = channel
      end

      def broadcast
        @channel.push(to_json)
      end

      private

      def players
        Hammeroids::Player.all
      end

      def attributes
        { "type": "lobby", "payload": { "players": players } }
      end

      def to_json
        JSON.generate(attributes)
      end
    end
  end
end
