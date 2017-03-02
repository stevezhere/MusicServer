require 'byebug'
class PlaylistsController < ApplicationController
	
	def show 
		@playlist = Playlist.find(params[:id])
		@stream = params[:stream].to_i ||= 0 
		if @playlist
			render 'show'
		else
			redirect_to user_path(current_user), flash: {notice: 'Playlist Undefined'}
		end
	end

	def edit
		@playlist = Playlist.find(params[:id])
		if @playlist
			render 'edit'
		else
			redirect_to user_path(current_user), flash: {alert: 'Unauthorized Access'}
		end
	end

	def create
		name = playlist_params[:name]
		@playlist = Playlist.new(name: name, description: 'Optional description', user_id: current_user.id)

		if @playlist.valid?
			@playlist.save
			redirect_to user_path(current_user)
		else
			redirect_to user_path(current_user), :flash => { :alert => @playlist.errors.full_messages}
		end
	end

	def update
		@playlist = Playlist.find(params[:id])
		if @playlist.update(playlist_params)
			redirect_to @playlist, flash: {notice: "Changes Saved"}
		else
			redirect_to user_path(current_user), flash: {alert: @playlist.errors.full_messages}
		end
	end

	def destroy
		playlist = Playlist.find(params[:id])
		if playlist
			playlist.destroy
			redirect_to user_path(current_user), flash: {notice: "#{playlist.name} has been removed"}
		else
			redirect_to user_path(current_user), :flash => { :alert => "Unknown error occured"}
		end
	end

	def stream
		playlist = Playlist.find(params[:id])
    music = playlist.musics[params[:stream].to_i]
    if music
      send_file music.path
    end
  end

  def next
  	@playlist = Playlist.find(params[:id])
  	@stream = params[:stream].to_i + 1 
  	if @playlist
  		if @stream < @playlist.musics.count
  			redirect_to playlist_path(@playlist, stream: @stream)
  		else
  			redirect_to playlist_path(@playlist)
  		end
  	else
  		redirect_to user_path(current_user)
  	end
  end

  def previous
  	@playlist = Playlist.find(params[:id])
  	@stream = params[:stream].to_i - 1 
  	if @playlist
  		if @stream > -1
  			redirect_to playlist_path(@playlist, stream: @stream)
  		else
  			redirect_to playlist_path(@playlist, stream: (@playlist.musics.count - 1))
  		end
  	else
  		redirect_to user_path(current_user)
  	end
  end

	private
	def playlist_params
		params.require(:playlist).permit(:name, :description)
	end
end