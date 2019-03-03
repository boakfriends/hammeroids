module Hammeroids
  # Represents player stores player UUID in redis.
  class Player
    attr_accessor :id, :name
    LIST_NAME = "players".freeze

    def self.create(id, name: "Guest")
      player = new(id, name: name)
      player.create
      player
    end

    def initialize(id, name: "Guest")
      @id = id
      @name = name
    end

    def create
      redis.lpush("players", @id)
    end

    def to_h
      {
        id: @id,
        name: @name
      }
    end

    def to_json
      to_h.to_json
    end

    private

    def redis
      @redis ||= Redis.new(url: ENV.fetch("REDIS_URL"))
    end
  end
end
