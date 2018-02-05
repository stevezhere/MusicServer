class SongEntriesController < ApplicationController
	def create
		if song_entry_params[:entry_ids]
			add_songs = []
			song_ids = song_entry_params[:entry_ids].map{|song_id| song_id.to_i}
			song_ids.each do |song|
				entry = SongEntry.new({playlist_id: params[:playlist_id], music_id: song})
				add_songs << entry.music.id if entry.save
			end
		end
		respond_to do |format|
			format.html { redirect_to edit_playlist_path(params[:playlist_id]) }
			format.json {
				add_songs ? (render json: { newMusics: add_songs }) : (head 400)
			}
		end
	end

	def destroy
		if song_entry_params[:entry_ids]
			remove_songs = []
			song_ids = song_entry_params[:entry_ids].map{|song_id| song_id.to_i}
			song_ids.each do |song|
				entry = SongEntry.find_by(playlist_id: params[:playlist_id], music_id: song)
				if entry
					remove_songs << entry.music.id
					entry.destroy
				end
			end
		end
		respond_to do |format|
			format.html { redirect_to edit_playlist_path(params[:playlist_id]) }
			format.json {
				remove_songs ? (render json: { musics: remove_songs }) : (head 400)
			}
		end
	end

	private
	def song_entry_params
		params.require(:song_entry).permit(entry_ids: [])
	end
end