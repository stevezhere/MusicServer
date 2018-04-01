class MusicsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]
	# require "base64"
  def index
    @musics = Music.all.order(:title)
    @music = Music.new()
  end

  def show
    if @musics = Music.where(id: params[:id])
      render 'show'
    else
      redirect_to '/', :flash => { :notice => "Song Cannot be found"}
    end
  end

  def create
    @music = Music.new(music_params)
    if @music.save && @music.find_path_validation
      respond_to do |format|
        format.html { redirect_to @music, :flash => {:notice => "#{@music.title} Successfully Stored"} }
        format.json { render json: @music }
      end
    else
      respond_to do |format|
        format.html { redirect_to new_music_path, :flash => { :alert => @music.errors.full_messages} }
        format.json { render json: @music.errors.full_messages, status: 422 }
      end
    end      
  end

  def destroy
    if music = Music.find_by_id(params[:id])
      remove_song = music.destroy
      respond_to do |format|
        format.html { redirect_to '/', :flash => { :notice => "#{music.title} Successfully Removed"} }
        format.json { render json: remove_song}
      end
    else
      respond_to do |format|
        format.html { redirect_to '/', :flash => { :alert => "Music Not Found"} }
        format.json { render json: "Music Not Found", status: 422 }
      end
      
    end
  end

  def search
    title = music_params[:title]
    @musics = Music.where("title ILIKE ?", "%#{title}%").order(:title)
    render 'show'
  end

  def stream
    if music = Music.find_by_id(params[:id])
      send_file music.audio.path
    end
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
