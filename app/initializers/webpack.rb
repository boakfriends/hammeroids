class Webpack
  LOCATIONS = {
    development: "http://localhost:8081/main.js",
    production: "/dist/index.js"
  }.freeze

  def self.pack_location
    LOCATIONS.fetch(environment.to_sym)
  end

  def self.environment
    ENV["RACK_ENV"]
  end
end
