class SongEntriesController < ApplicationController

	def new
		@song_entry = SongEntry.new(playlist_id: params[:playlist_id])
		@playlist = Playlist.find(params[:playlist_id])
		playlist_songs = @playlist.musics
		@musics = Music.all_except(playlist_songs)
	end

	def create

	end

	def destroy
		song_ids = params[:song_entry].keys.map{|song_id| song_id.to_i}
		song_ids.each do |song|
			entry = SongEntry.find_by(playlist_id: params[:playlist_id], music_id: song)
			entry.destroy if entry
		end
		redirect_to edit_playlist_path(params[:playlist_id])
	end

	private
	def song_params
		params.require(:song_entry)
	end
end