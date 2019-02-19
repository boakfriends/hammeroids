require File.expand_path('../app/app.rb', __FILE__)

if ENV["RACK_ENV"] == "development"
  pid = Process.spawn("./node_modules/.bin/webpack-dev-server")
  Process.detach(pid)
  puts "Started Webpack dev server #{pid}"
end

Hammeroids::Launcher.new.run
