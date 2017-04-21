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

  # is this end point for when user select music off your drive or upload?
  def create
    @music = Music.new(music_params)
    if @music.valid?
      @music.save
      if @music.find_path_validation
        redirect_to @music, :flash => { :notice => "#{@music.title} Successfully Stored"}
      else
        redirect_to new_music_path, :flash => { :alert => "#{@music.title} was not found"} # you probably wont want this to create if music was not found? so do the @music.save in the if above
      end
    else
      redirect_to new_music_path, :flash => { :alert => @music.errors.full_messages}
    end
  end

  # one pattern i've seen is
  def destroy
    music.destroy
    if music.deleted?
      success_action
    else
      fail_action
    end
  end

  def destroy
    music = Music.find(params[:id])
    if music
      music.destroy
      redirect_to '/', :flash => { :notice => "#{music.title} Successfully Removed"}
    else
      redirect_to '/', :flash => { :alert => "Unknown error occured"}
    end
  end

  def search
    title = music_params[:title]
    @music = Music.find_by_title(title) # this is looking for an exact match, i think you are looking for something like @musics = Music.where("title ILIKE ?", "%#{title}%")

    if @music
      redirect_to @music, :flash => { :notice => "Song Found for convience make sure javascript is enabled"}
    else
      redirect_to '/', :flash => { :alert => "Cannot find song, Check spelling"}
    end
  end

  def stream
    music = Music.find(params[:id])
    if music
      send_file music.path
    end
  end

  # notice you are doing Music.find a lot, add a private method
  def music
    @music ||= Music.find(param[:id])
  end
  # this way its cached in music, and you always can use `music`
  def stream
    send_file music if music
  end

  # you can even add this to the top of your controller
  before_action :music, only: [:stream, :destroy, :show]
  # and you can do this, b/c @music will be loaded when before_action calls
  # `music`
  def stream
    send_file music if @music
  end


  # def scan
  #   @files = Music.scan_desktop
  #   if @files.length > 0
  #     render 'scan'
  #   else
  #     redirect_to new_music_path, :flash => { :alert => "There are no Files on Desktop"}
  #   end
  # end

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

  private
  def music_params
    params.require(:music).permit(:title, :audio)
  end
end
