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

	def edit
		@playlist = Playlist.find(params[:id])
		if @playlist
			render 'edit'
		else
			redirect user_path(current_user), flash: {alert: 'Unauthorized Access'}
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
			redirect user_path(current_user), flash: {alert: 'Unauthorized Access'}
		end
	end

	def destroy
	end

	private
	def playlist_params
		params.require(:playlist).permit(:name, :description)
	end
end