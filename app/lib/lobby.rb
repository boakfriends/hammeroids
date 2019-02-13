module Hammeroids
  # Reads list of registered players.
  class Lobby
    LIST_KEY = "players".freeze

    def initialize; end

    def clear
      redis.del(LIST_KEY)
    end

    def to_h
      { players: players }
    end

    def to_json
      to_h.to_json
    end

    private

    def players
      redis.lrange(LIST_KEY, 0, -1)
    end

    def redis
      @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
    end
  end
end
