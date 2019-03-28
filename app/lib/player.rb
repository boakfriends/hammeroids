module Hammeroids
  # Represents a player, stores attributes in redis.
  # Class to can retrieve a list of players
  class Player
    class << self
      def all
        redis.smembers("players").map { |player_json| JSON.parse(player_json) }
      end

      def redis
        @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
      end
    end

    attr_accessor :id, :name

    def initialize(id: nil, name: "Guest")
      @id = id
      @name = name
    end

    def delete
      redis.srem("players", to_json)
    end

    def save
      redis.sadd("players", to_json)
    end

    private

    def redis
      @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
    end

    def to_json
      JSON.generate(id: @id, name: @name)
    end
  end
end
