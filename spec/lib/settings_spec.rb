require "spec_helper"

RSpec.describe Hammeroids::Settings do
  describe ".base_web_url" do
    subject { described_class.base_web_url }

    it "provides a base URL for front end" do
      expect(subject).to eq "http://localhost:5000"
    end
  end

  describe ".base_socket_url" do
    subject { described_class.base_socket_url }

    it "provides a base URL for socket" do
      expect(subject).to eq "ws://localhost:8080/game"
    end
  end

  describe ".pack_location" do
    subject { described_class.pack_location }

    it "provides a base URL for webpack" do
      expect(subject).to eq "http://localhost:8081"
    end
  end
end
