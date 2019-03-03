module Hammeroids
  class Connection
    def initialize(socket, channel)
      @socket = socket
      @channel = channel
      @id = channel.subscribe { |message| @socket.send(message) }
      @socket.onmessage { |message| process(message) }
      @socket.onclose { unsubscribe }
      @socket.send(%({"type":"welcome", "id": #{@id}}))
    end

    def unsubscribe
      @channel.unsubscribe(@id)
    end

    # deals with incoming data
    def process(message)
      @channel << %(#{message}) rescue nil
    end
  end
end