class MusicPlaylist < ActiveRecord::Base
	belongs_to :music
	belongs_to :playlist
end
