class SongEntry < ActiveRecord::Base
	belongs_to :music, presence: true
	belongs_to :playlist, presence: true
end
