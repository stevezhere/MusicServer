require 'byebug'
class MusicsController < ApplicationController
	require "base64"
	#skip_before_action :verify_authenticity_token
   
  def index
    @musics = Music.all
  end

  def show
    @music = Music.find(params[:id])
    if @music
      render 'show'
    else
      redirect_to '/'
    end
    # @music = Rails.root.join 'public', 'music', 'song.mp3'
  end

  def new
    @music = Music.new()
  end

  def create
    title = music_params[:title]
    path = Rails.root.join('public', 'music', title)
    @music = Music.new(title: title, path: path)

    if @music.valid?
      @music.save
      @music.move_file(title)
      redirect_to @music
    else
      redirect_to new_music_path
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
    # root_path = Rails.root.join 'public', 'music'
    # musics = root_path.children
    # @music = musics[0]
    if @music
      redirect_to @music
    else
      redirect_to musics_path

    end
  end

  def scan
    @files = Music.scan_desktop
    if @files.length > 0
      render 'scan'
    else
      redirect_to new_music_path
    end
  end

  def stream
    music = Music.find(params[:id])
    if music
      send_file music.path
    end
  end

  private
  def music_params
    params.require(:music).permit(:title)
  end
end
