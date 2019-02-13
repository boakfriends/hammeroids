%w[require_all 
   em-websocket thin redis sinatra].each { |library| require library }
ENV['RACK_ENV'] ||= 'development'
require 'rubygems' unless defined?(Gem)
require 'bundler/setup'
require_all 'app'
Bundler.require(:default, ENV['RACK_ENV'].to_sym)

module Hammeroids
  # Launches EM loop with embedded web application.
  class Launcher
    def initialize(socket_port: ENV.fetch("SOCKET_PORT"), socket_host: "0.0.0.0", web_host: "0.0.0.0", web_port: ENV.fetch("WEB_PORT"))
      @socket_port = socket_port
      @socket_host = socket_host
      @web_host = web_host
      @web_port = web_port
    end

    def run
      Hammeroids::Lobby.new.clear

      EventMachine.run do
        EventMachine::WebSocket.start(host: @socket_host, port: @socket_port) do |ws|
          ws.onopen do |handshake|
            puts "open"
          end

          ws.onmessage do |msg|
            puts msg
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
    set :root, File.join(File.dirname(__FILE__), '..')
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

    get '/' do
      erb :game
    end

    get '/creator' do
      erb :creator
    end
  end

end
