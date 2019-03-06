module Hammeroids
  module Players
    # Subscribes @connection to @channel and defines onmessage and onclose events.
    class Subscription
      def initialize(connection, channel)
        @connection = connection
        @channel = channel
      end

      def create
        @connection.send(%({"type":"welcome", "id": #{id}}))
        id
      end

      private

      def id
        @id ||= @channel.subscribe { |message| @connection.send(message) }
      end
    end
  end
end
