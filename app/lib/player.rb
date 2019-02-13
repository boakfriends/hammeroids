module Hammeroids
  # Represents player stores player UUID in redis.
  class Player
    LIST_NAME = "players".freeze

    def initialize
      @id = SecureRandom.uuid
    end

    def create
      redis.lpush("players", @id)
    end

    def name
      "player_#{@id}"
    end

    private

    def redis
      @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
    end
  end
end

