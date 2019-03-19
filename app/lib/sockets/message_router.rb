module Hammeroids
  module Sockets
    # Routes inbound messages to the correct class/method.
    class MessageRouter
      ROUTABLE = %w[player_name].freeze

      def initialize(connection, message_json)
        @connection = connection
        @message_json = message_json
      end

      def action
        return unless ROUTABLE.include? type

        klass.new(@connection).send(method.to_sym, **args)
      end

      private

      def args
        message.dig("method", "args").symbolize_keys
      end

      def klass
        "Hammeroids::Sockets::Messages::#{type.camelize}".constantize
      end

      def method
        message.dig("method", "name")
      end

      def message
        @message ||= JSON.parse(@message_json)
      end

      def type
        message["type"]
      end
    end
  end
end
