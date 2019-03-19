module Hammeroids
  module Sockets
    module Messages
      # Sets player name in Lobby
      class PlayerName < Base
        def update(**args)
          # TODO: update player name in redis
          puts args
        end
      end
    end
  end
end
