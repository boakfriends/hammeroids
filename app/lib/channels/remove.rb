module Hammeroids
  module Channels
    # Broadcasts player removal
    class Remove
      def initialize(channel, id)
        @channel = channel
        @id = id
      end

      def broadcast
        @channel.push(to_json)
      end

      private

      def attributes
        { type: "remove", payload: { id: @id } }
      end

      def to_json
        JSON.generate(attributes)
      end
    end
  end
end
