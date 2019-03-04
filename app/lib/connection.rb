module Hammeroids
  class Connection
    def initialize(socket, channel)
      @socket = socket
      @channel = channel
    end

    def setup!
      @socket.send(%({"type":"welcome", "id": #{id}}))
      @socket.onmessage { |message| process(message) }
      @socket.onclose { unsubscribe }
    end

    private

    def id
      @id ||= @channel.subscribe { |message| @socket.send(message) }
    end

    def unsubscribe
      @channel.unsubscribe(id)
    end

    # deals with incoming data
    def process(message)
      @channel << %(#{message}) rescue nil
    end
  end
end
