module Hammeroids
  # Server-side representation of a player
  class Player
    def initialize(ws, name: 'Guest')
      @ws = ws
      @name = name
    end

    def id
      @ws.object_id
    end
  end
end
