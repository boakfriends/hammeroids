module Hammeroids
  # Basic Settings wrapper object.
  class Settings
    class << self
      def base_socket_url
        @base_socket_url ||= "#{socket_scheme}#{base_host}:#{ENV['PORT']}/game"
      end

      def base_web_url
        @base_web_url ||= "#{web_scheme}#{base_host}:#{ENV['WEB_PORT']}"
      end

      def pack_location
        @pack_location ||= Sinatra::Base.production? ? "/dist" : "#{web_scheme}#{base_host}:8081"
      end

      private

      def base_host
        ENV["BASE_HOST"] || "localhost"
      end

      def socket_scheme
        ENV["RACK_ENV"] == "production" ? "wss://" : "ws://"
      end

      def web_scheme
        ENV["RACK_ENV"] == "production" ? "https://" : "http://"
      end
    end
  end
end
