module Hammeroids
  module Subscriptions
    module Events
      # Welcome event, sent when Subscription is created.
      class Welcome
        def initialize(connection, id)
          @connection = connection
          @id = id
        end

        def create
          @connection.send(to_json)
        end

        private

        def attributes
          { type: "welcome", id: @id }
        end

        def to_json
          JSON.generate(attributes)
        end
      end
    end
  end
end
