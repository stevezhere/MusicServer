class MusicsController < ApplicationController
	require "base64"
	#skip_before_action :verify_authenticity_token
   
  def index
  end

  def show
  	# File.read("~/Music")

  	file = Rails.root.join 'music', 'song.mp3'
		#music = File.read(file)
		#@@enc   = Base64.encode64(music)
  	#p @@enc.class
  	#p 1111112221111111111112221111111111111111111111111111
  	#render :json => @@enc
  	p file.class
  	p file
  	@music = file
  end

  def new
  end

  def create
  	file = Rails.root.join 'music', 'song.mp3'
  	find_by
  end
end
