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
        @connection.onmessage { |message| process(message) }
        @connection.onclose { unsubscribe }
        id
      end

      private

      def id
        @id ||= @channel.subscribe { |message| @connection.send(message) }
      end

      def unsubscribe
        @channel.unsubscribe(id)
      end

      # deals with incoming data
      def process(message)
        @channel << %(#{message}) rescue nil
      end
    end
  end
end
