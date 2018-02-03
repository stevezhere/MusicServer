class UsersController < ApplicationController
	def show
		if @user = User.find_by_id(params[:id])
			@playlists = @user.playlists.order(:created_at)
			@playlist = Playlist.new
			render 'show'
		else
			redirect_to '/', flash: { alert: 'Unauthorized access' }
		end
	end
end