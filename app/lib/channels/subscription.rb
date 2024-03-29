module Hammeroids
  module Channels
    # Subscribes @connection to @channel and send welcome event with subscription ID.
    # Must return a truthy value, in this case the connection itself.
    class Subscription
      def initialize(connection, channel)
        @connection = connection
        @channel = channel
      end

      def create
        @id = id
        @connection.send(json)
        @id
      end

      private

      def attributes
        { type: "welcome", payload: {id: @id }}
      end

      def id
        @id ||= @channel.subscribe { |message| @connection.send(message) }
      end

      def json
        JSON.generate(attributes)
      end
    end
  end
end
