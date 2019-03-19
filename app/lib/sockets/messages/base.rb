module Hammeroids
  module Sockets
    module Messages
      # Base class for messages
      class Base
        def initialize(connection)
          @connection = connection
        end
      end
    end
  end
end
