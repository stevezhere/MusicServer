class SongEntriesController < ApplicationController
	skip_before_action :verify_authenticity_token

	def create
		if params[:song_entry]
			add_songs = []
			song_ids = params[:song_entry].keys.map{|song_id| song_id.to_i}
			song_ids.each do |song|
				entry = SongEntry.new({playlist_id: params[:playlist_id], music_id: song})
				add_songs << entry.music if entry.save
			end
		end
		respond_to do |format|
			format.html { redirect_to edit_playlist_path(params[:playlist_id]) }
			format.json {
				add_songs ? (render json: { songs: add_songs }) : (head 400)
			}
		end
	end

	def destroy
		if params[:song_entry]
			remove_songs = []
			song_ids = params[:song_entry].keys.map{|song_id| song_id.to_i}
			song_ids.each do |song|
				entry = SongEntry.find_by(playlist_id: params[:playlist_id], music_id: song)
				if entry
					remove_songs << entry.music
					entry.destroy
				end
			end
		end
		respond_to do |format|
			format.html { redirect_to edit_playlist_path(params[:playlist_id]) }
			format.json {
				remove_songs ? (render json: { songs: remove_songs }) : (head 400)
			}
		end
	end

	private
	def song_params
		params.require(:song_entry).permit(:song_entry)
	end
end