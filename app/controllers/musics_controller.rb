require 'byebug'
class MusicsController < ApplicationController
	require "base64"
	#skip_before_action :verify_authenticity_token
   
  def index
    @musics = Music.all
  end

  def show
    @music = Music.find(params[:id])
    # @music = Rails.root.join 'public', 'music', 'song.mp3'
  end

  #  def show
  #   @path = params[:path] || '/some/default'
  #   @files = Dir.foreach(path)
  # end

  def new
    @music = Music.new()
  end

  def create
    title = music_params[:title]
    path = Rails.root.join 'public', 'music', title
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


      # find filename of each in a pathname object
      # path.each_filename {|music| p music}
      # path.each_filename(false) {|musir| p music}
      # path.open <++++++ converts pathname to file name

      # file = "/path/to/xyz.mp4"

      # comp = File.basename file        # => "xyz.mp4"
      # extn = File.extname  file        # => ".mp4"
      # name = File.basename file, extn  # => "xyz"
      # path = File.dirname  file        # => "/path/to"

    title = music_params[:title]
    @music = Music.find_by_title(title)
    # root_dir = Rails.root.join 'public', 'music'
    # musics = root_dir.children
    # @music = musics[0]
    if @music
      redirect_to @music
    else
      redirect_to musics_path
    end
  end

  def scan
    #scan desktop move song to public music then add into active record
    root_dir = Rails.root.join 'public', 'music'
    @musics = root_dir.children
  end

  private
  def music_params
    params.require(:music).permit(:title)
  end
end
