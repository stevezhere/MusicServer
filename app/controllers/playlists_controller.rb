class PlaylistsController < ApplicationController
	skip_before_action :verify_authenticity_token, :only => [:create, :update]
	def index
		@playlists = Playlist.all.where(share: true).order(:name)
	end
	
	def show 
		if @playlist = Playlist.find_by_id(params[:id])
			@musics = @playlist.musics.ordered
			render 'show'
		else
			redirect_to user_path(current_user), flash: {notice: 'Playlist Undefined'}
		end
	end

	def edit
		if @playlist = Playlist.find_by_id(params[:id])
			@musics = @playlist.musics.ordered
			@new_musics = Music.all_except(@musics).order(:title)
			render 'edit'
		else
			redirect_to user_path(current_user), flash: {alert: 'Unauthorized Access'}
		end
	end

	def create
		name = playlist_params[:name]
		@playlist = Playlist.new(name: name, description: 'Optional description', user_id: current_user.id, share: false)
		if @playlist.save
			respond_to do |format|
				format.html { redirect_to user_path(current_user) }
				format.json { render json: @playlist }
			end
		else
			respond_to do |format|
				format.html { redirect_to user_path(current_user), :flash => { :alert => @playlist.errors.full_messages} }
				format.json { render json: @playlist.errors, status: 422 }
			end
		end
	end

	def update
		if @playlist = Playlist.find_by_id(params[:id])
			if @playlist.update(playlist_params)
				respond_to do |format|
					format.html { 
						redirect_back(fallback_location: edit_playlist_path(params[:id]), flash: {notice: "Changes Saved"}) 
					}
					format.json { render json: @playlist } 
				end
			else
				redirect_to user_path(current_user), flash: {alert: @playlist.errors.full_messages}
			end
		else
			redirect_to user_path(current_user)
		end
	end

	def destroy
		if playlist = Playlist.find_by_id(params[:id])
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