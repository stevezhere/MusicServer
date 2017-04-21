class SongEntriesController < ApplicationController
	skip_before_action :verify_authenticity_token

  # another pattern ive seen is
  def create
    if entry.save
      render success
    else
      render error
    end
  end

	def create
		if params[:song_entry]
      song_ids = params[:song_entry].keys.map{|song_id| song_id.to_i} # .map(&:to_i)
			song_ids.each do |song|
				entry = SongEntry.new({playlist_id: params[:playlist_id], music_id: song})
        entry.save if entry.valid? # save calls valid? so no need to say if valid?
			end
		end
		redirect_to edit_playlist_path(params[:playlist_id])
	end

	def destroy
		if params[:song_entry]
			song_ids = params[:song_entry].keys.map{|song_id| song_id.to_i}
			song_ids.each do |song|
				entry = SongEntry.find_by(playlist_id: params[:playlist_id], music_id: song)
				entry.destroy if entry
			end
		end
		redirect_to edit_playlist_path(params[:playlist_id])
	end

	private
	def song_params
		params.require(:song_entry).permit(:song_entry)
	end
end
