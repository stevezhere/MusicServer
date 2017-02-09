require 'byebug'
class MusicsController < ApplicationController
	require "base64"
	#skip_before_action :verify_authenticity_token
   
  def index
    @musics = Music.all
  end

  def show
    @path = Music.find(params[:id]).path
  end

  def new
    @music = Music.new()
  end

  def create
    title = music_params[:title]
    path = Rails.root.join 'music', "#{title}.mp3"
    @music = Music.new(title: title, path: path)
    if @music.valid?
      @music.save
      redirect_to @music
    else
      render 'new'
    end
  end

  def search
    	# File.read("~/Music")
      # file = Rails.root.join 'music', 'song.mp3'
      # p file.class
      # p file
      #music = File.read(file)
      #@@enc   = Base64.encode64(music)
      #render :json => @@enc

    title = music_params[:title]
    @music = Music.find_by_title(title)
    if @music
      redirect_to @music
    else
      render 'index'
    end
  end

  private
  def music_params
    params.require(:music).permit(:title)
  end
end