class UsersController < ApplicationController
	def show
		@user = User.find(params[:id])
		@playlist = Playlist.new
		if @user
			render 'show'
		else
			redirect '/', flash: { alert: 'Unauthorized access' }
		end
	end
end

# whoa no sign up, registration?
