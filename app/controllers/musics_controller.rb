class MusicsController < ApplicationController
	# require "base64"
   
  def index
    @musics = Music.all.order(:title)
  end

  def show
    @music = Music.find(params[:id])
    if @music
      render 'show'
    else
      redirect_to '/', :flash => { :notice => "Song Cannot be found"}
    end
  end

  def new
    @music = Music.new()
  end

  def create
    title = music_params[:title]
    path = Rails.root.join('public', 'music', title)
    @music = Music.new(title: title, path: path)

    if @music.valid?
      @music.move_file_storage(title) if @music.save
      redirect_to @music, :flash => { :notice => "#{@music.title} Successfully Stored"}
    else
      redirect_to new_music_path, :flash => { :alert => "#{@music.title} cannot be found on Desktop"}
    end
  end

  def destroy
    music = Music.find(params[:id])
    if music
      music.move_file_desktop(music.title)
      music.destroy
      redirect_to '/', :flash => { :notice => "#{music.title} Successfully Removed"}
    else
      redirect_to '/', :flash => { :alert => "Unknown error occured"}
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
      redirect_to @music, :flash => { :notice => "Song Found"}
    else
      redirect_to '/', :flash => { :alert => "Cannot find song, check spelling and include file type is correct"}
    end
  end

  def scan
    @files = Music.scan_desktop
    if @files.length > 0
      render 'scan'
    else
      redirect_to new_music_path, :flash => { :alert => "There are no Files on Desktop"}
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
