module Hammeroids
  # Basic Settings wrapper object.
  class Settings
    class << self
      def base_socket_url
        @base_socket_url ||= "#{socket_scheme}#{ENV['BASE_HOST']}:#{ENV['SOCKET_PORT']}/game"
      end

      def base_web_url
        @base_web_url ||= "#{web_scheme}#{ENV['BASE_HOST']}:#{ENV['WEB_PORT']}"
      end

      private

      def socket_scheme
        ENV["RACK_ENV"] == "production" ? "wss://" : "ws://"
      end

      def web_scheme
        ENV["RACK_ENV"] == "production" ? "https://" : "http://"
      end
    end
  end
end
