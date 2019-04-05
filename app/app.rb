%w[require_all active_support/core_ext/hash/keys active_support/inflector em-websocket thin redis sinatra].each { |library| require library }
ENV['RACK_ENV'] ||= 'development'
require 'rubygems' unless defined?(Gem)
require 'bundler/setup'
require_all 'app'
Bundler.require(:default, ENV['RACK_ENV'].to_sym)

module Hammeroids
  # Launches EM loop with embedded web application.
  class Launcher
    def initialize(socket_port: ENV.fetch("SOCKET_PORT"), socket_host: "0.0.0.0", socket_secure: false, web_host: "0.0.0.0", web_port: ENV.fetch("WEB_PORT"))
      @socket_port = socket_port
      @socket_host = socket_host
      @socket_secure = socket_secure
      @web_host = web_host
      @web_port = web_port
    end

    def run
      EventMachine.run do

        channel = EM::Channel.new
        EventMachine::WebSocket.start(host: @socket_host, port: @socket_port, secure: @socket_secure) do |connection|
          player = Hammeroids::Player.new

          connection.onopen do |handshake|
            player.id = Hammeroids::Channels::Subscription.new(connection, channel).create
          end

          connection.onmessage do |message|
            # TODO: refactor this once we have a better idea of all the events we'll be dealing with.
            message_h = JSON.parse(message).deep_symbolize_keys
            if message_h[:type] == "player"
              player.name = message_h[:attributes][:name]
              player.save
              Hammeroids::Channels::Lobby.new(channel).broadcast
            end
            channel.push(message)
          end

          connection.onclose do
            Hammeroids::Channels::Remove.new(channel, player.id).broadcast
            player.delete
            Hammeroids::Channels::Lobby.new(channel).broadcast
          end
        end

        Rack::Server.start(app: Hammeroids::App,
                           server: "thin",
                           Host: @web_host,
                           Port: @web_port,
                           signals: false)
      end
    end

    private

    def dispatch
      @dispatch ||= Rack::Builder.app do
        map '/' do
          run @app
        end
      end
    end
  end
end

module Hammeroids
  # Basic web application
  class App < Sinatra::Base
    set :app_file, __FILE__
    set :root, File.dirname(__FILE__)
    set :logging, true
    set :views, File.join(File.dirname(__FILE__), 'views')
    set :public_folder, File.dirname(__FILE__) + '/assets'
    set :static, true

    configure :development do
      require 'dotenv/load'
      enable :logging
    end

    configure :test do
      require 'byebug'
      require 'dotenv/load'
    end

    configure :production do
      enable :logging
    end

    helpers do
      def partial(page, options: {})
        erb page.to_sym, options.merge!(layout: false)
      end
    end

    get '/' do
      erb :join
    end

    post '/game' do
      @name = params["name"]
      erb :game
    end

    get '/creator' do
      erb :creator
    end
  end
end
