%w[require_all active_support/core_ext/object/json
   puma sinatra faye/websocket].each { |library| require library }
ENV['RACK_ENV'] ||= 'development'
require 'rubygems' unless defined?(Gem)
require 'bundler/setup'
require_all 'app'
Bundler.require(:default, ENV['RACK_ENV'].to_sym)

module Hammeroids
  class App < Sinatra::Base
    set :app_file, __FILE__
    set :root, File.join(File.dirname(__FILE__), '..')
    set :server, :puma
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

    run! if __FILE__ == $PROGRAM_NAME
  end
end
