module Hammeroids
  # Represents a player, stores attributes in redis.
  # Class to can retrieve a list of players
  Player = Struct.new(:name) do
    class << self
      def all
        redis.smembers("players").map { |player_json| JSON.parse(player_json) }
      end

      def redis
        @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
      end
    end

    def delete
      redis.srem("players", to_json)
    end

    def update(**attributes)
      @name = attributes[:name]
      save
    end

    private

    def redis
      @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
    end

    def save
      redis.sadd("players", to_json)
    end

    def to_json
      JSON.generate(name: @name)
    end
  end
end
