module Hammeroids
  module Players
    # Subscribes @connection to @channel and defines onmessage and onclose events.
    class Subscription
      EVENTS = [
        Hammeroids::Subscriptions::Events::Welcome
      ].freeze

      def initialize(connection, channel)
        @connection = connection
        @channel = channel
      end

      def create
        create_events
        id
      end

      private

      def create_events
        EVENTS.each { |event| event.new(@connection, id).create }
      end

      def id
        @id ||= @channel.subscribe { |message| @connection.send(message) }
      end
    end
  end
end
