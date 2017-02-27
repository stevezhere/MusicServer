require 'byebug'
class PlaylistsController < ApplicationController

	
	def show 
		@playlist = Playlist.find(params[:id])
		if @playlist
			render 'show'
		else
			redirect user_path(current_user), flash: {notice: 'Playlist Undefined'}
		end
	end

	def create
		name = playlist_params[:name]
		@playlist = Playlist.new(name: name, user_id: current_user.id)

		if @playlist.valid?
			@playlist.save
			redirect_to user_path(current_user)
		else
			redirect_to user_path(current_user), :flash => { :alert => @playlist.errors.full_messages}
		end
	end

	private
	def playlist_params
		params.require(:playlist).permit(:name, :description)
	end
end