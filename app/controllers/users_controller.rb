class UsersController < ApplicationController
	def show
		@user = User.find(params[:id])
		@playlists = @user.playlists.order(:created_at)
		@playlist = Playlist.new
		if @user
			render 'show'
		else
			redirect '/', flash: { alert: 'Unauthorized access' }
		end
	end
end