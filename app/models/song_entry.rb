class SongEntry < ActiveRecord::Base
	belongs_to :music
	belongs_to :playlist
	validates_presence_of :music, :playlist
end
