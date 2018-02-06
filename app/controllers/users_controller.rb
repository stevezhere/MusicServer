class UsersController < ApplicationController
	before_action :authenticate_user!, unless: -> { current_user.guest? }
	def show
		if @user = User.find_by_id(current_user)
			@playlists = @user.playlists.order(:created_at)
			@playlist = Playlist.new
			render 'show'
		else
			redirect_to '/', flash: { alert: 'Unauthorized access' }
		end
	end
end