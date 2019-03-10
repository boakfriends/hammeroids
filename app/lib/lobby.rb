module Hammeroids
  # Reads list of registered players.
  class Lobby
    LIST_KEY = "players".freeze

    def initialize; end

    def add(player_json)
      redis.lpush(LIST_KEY, player_json)
    end

    def remove(player_json)
      redis.lrem(LIST_KEY, 0, player_json)
    end

    def clear
      redis.del(LIST_KEY)
    end

    def to_json
      JSON.generate(to_h)
    end

    private

    def players
      players_json.map { |player_json| JSON.parse(player_json) }
    end

    def players_json
      redis.lrange(LIST_KEY, 0, -1)
    end

    def redis
      @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
    end

    def to_h
      { "type": self.class.name.downcase, "payload": { "players": players } }
    end
  end
end
