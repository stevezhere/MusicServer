class PlaylistsController < ApplicationController
	skip_before_action :verify_authenticity_token
	def index
		@playlists = Playlist.all.where(share: true)
	end
	
	def show 
		@playlist = Playlist.find(params[:id])
		@musics = @playlist.musics
		if @playlist
			render 'show'
		else
			redirect_to user_path(current_user), flash: {notice: 'Playlist Undefined'}
		end
	end

	def edit
		@playlist = Playlist.find(params[:id])
		@musics = @playlist.musics
		@new_musics = Music.all_except(@musics).order(:title)
		if @playlist
			render 'edit'
		else
			redirect_to user_path(current_user), flash: {alert: 'Unauthorized Access'}
		end
	end

	def create
		name = playlist_params[:name]
		@playlist = Playlist.new(name: name, description: 'Optional description', user_id: current_user.id, share: false)

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
			redirect_to edit_playlist_path(@playlist), flash: {notice: "Changes Saved"}
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

	private
	def playlist_params
		params.require(:playlist).permit(:name, :description, :share)
	end
end