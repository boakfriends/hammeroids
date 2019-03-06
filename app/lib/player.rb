module Hammeroids
  # Represents a connection and subscription to the game channel.
  # Adds the Player to the lobby(redis) list.
  class Player
    attr_accessor :name

    def initialize(connection, channel, name: "Guest")
      @connection = connection
      @channel = channel
      @name = name
    end

    def join
      Hammeroids::Lobby.new.add(to_json)
    end

    def leave
      Hammeroids::Lobby.new.remove(to_json)
    end

    def subscription_id
      @subscription_id ||= Hammeroids::Players::Subscription.new(@connection, @channel).create
    end

    private

    def to_h
      {
        id: subscription_id,
        name: @name
      }
    end

    def to_json
      to_h.to_json
    end
  end
end
