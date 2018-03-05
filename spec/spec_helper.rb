require 'rack/test'
require 'webmock/rspec'
require 'rspec'

ENV['RACK_ENV'] = 'test'
require File.expand_path('../../app/app.rb', __FILE__)
Dir[File.dirname(__FILE__) + '/support/*.rb'].each {|file| require file }

module RSpecMixin
  include Rack::Test::Methods

  def app
    described_class
  end
end

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
  conf.include RSpecMixin
end
