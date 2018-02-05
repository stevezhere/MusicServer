class PlaylistsController < ApplicationController
	before_action :authenticate_user!, only: [:show, :edit, :create, :update, :destroy], unless: -> { current_user.guest? }
	def index
		@playlists = Playlist.all.where(share: true).order(:name)
	end
	
	def show 
		if @playlist = Playlist.find_by_id(params[:id])
			if @playlist.share || @playlist.user == current_user
				@musics = @playlist.musics.ordered
				render 'show'
			else
				redirect_to user_path(current_user), flash: {alert: 'Unauthorized access'}
			end
		else
			redirect_to user_path(current_user), flash: {notice: 'Playlist Not Found'}
		end
	end

	def edit
		if @playlist = Playlist.find_by_id(params[:id])
			if @playlist.user == current_user
				@musics = @playlist.musics.ordered
				@new_musics = Music.all_except(@musics).order(:title)
				render 'edit'
			else
				redirect_to user_path(current_user), flash: {alert: 'Unauthorized Access'}
			end
		else
			redirect_to user_path(current_user), flash: {notice: 'Playlist Not Found'}
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
				format.json { render json: @playlist.errors.full_messages, status: 422 }
			end
		end
	end

	def update
		if @playlist = Playlist.find_by_id(params[:id]) 
			if @playlist.user == current_user && @playlist.update(playlist_params)
				respond_to do |format|
					format.html { 
						redirect_back(fallback_location: edit_playlist_path(@playlist), flash: {notice: "Changes Saved"}) 
					}
					format.json { render json: @playlist } 
				end
			else
				respond_to do |format|
					format.html { 
						redirect_back(fallback_location: playlist_path(@playlist), flash: {alert: @playlist.errors.full_messages})
					}
					format.json { render json: @playlist.errors.full_messages, status: 422 }
				end
			end
		else
			respond_to do |format|
				format.html { 
					redirect_to user_path(current_user), flash: {notice: 'Playlist Not Found'} 
				}
				format.json { render json: 'Playlist Not Found', status: 404 } 
			end
		end
	end

	def destroy
		if playlist = Playlist.find_by_id(params[:id]) 
			if playlist.user == current_user
				playlist.destroy
				redirect_to user_path(current_user), flash: {notice: "#{playlist.name} has been removed"}
			else
				redirect_to user_path(current_user), flash: {alert: 'Unauthorized Access'}
			end
		else
			redirect_to user_path(current_user), flash: {notice: 'Playlist Not Found'}
		end
	end

	private
	def playlist_params
		params.require(:playlist).permit(:name, :description, :share)
	end
end