class UsersController < ApplicationController
	def show
		if @user = User.find_by_id(params[:id])
			if @user == current_user
				@playlists = @user.playlists.order(:created_at)
				@playlist = Playlist.new
			else
				@playlists = @user.playlists.where(share: true).order(:created_at)
			end
				render 'show'
		else
			redirect_back(fallback_location: playlists_path, flash: {notice: 'User Not Found'}) 
		end
	end
end