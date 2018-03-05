module Hammeroids
  class Socket
    KEEP_ALIVE = 10

    def initialize(app)
      @app     = app
      @players = []
    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        ws = Faye::WebSocket.new(env, nil, ping: KEEP_ALIVE)
        ws.on :open do |event|
          @players << ws
          ws.send(player_list.to_json)
        end

        ws.on :message do |event|
          puts event.data
        end

        ws.on :close do |event|
          p [:close, ws.object_id, event.code, event.reason]
          @players.delete(ws)
          ws = nil
        end

        ws.rack_response
      else
        @app.call(env)
      end
    end

    private

    def player_list
      { type: 'playerList', data: @players.map(&:object_id) }
    end
  end
end
