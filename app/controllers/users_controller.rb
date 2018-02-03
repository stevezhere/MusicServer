class UsersController < ApplicationController
	def show
		@user = User.find_by_id(params[:id])
		if @user
			@playlists = @user.playlists.order(:created_at)
			@playlist = Playlist.new
			render 'show'
		else
			redirect_to root_path, flash: { alert: 'Unauthorized access' }
		end
	end
end