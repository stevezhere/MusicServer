class SongEntriesController < ApplicationController
	skip_before_action :verify_authenticity_token

	def create
		if params[:song_entry]
			song_ids = params[:song_entry].keys.map{|song_id| song_id.to_i}
			song_ids.each do |song|
				entry = SongEntry.new({playlist_id: params[:playlist_id], music_id: song})
				entry.save if entry.valid?
			end
		end
		redirect_to edit_playlist_path(params[:playlist_id])
	end

	def destroy
		if params[:song_entry]
			removed_song = []
			song_ids = params[:song_entry].keys.map{|song_id| song_id.to_i}
			song_ids.each do |song|
				entry = SongEntry.find_by(playlist_id: params[:playlist_id], music_id: song)
				removed_song << entry if entry
				entry.destroy if entry
			end
		end
		respond_to do |format|
			format.html { redirect_to edit_playlist_path(params[:playlist_id]) }
			format.json {
				return render json: { deleted: removed_song } if removed_song
				return head 400
			}
		end
	end

	private
	def song_params
		params.require(:song_entry).permit(:song_entry)
	end
end