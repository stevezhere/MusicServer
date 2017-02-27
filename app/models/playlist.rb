class Playlist < ActiveRecord::Base
	belongs_to :user
	has_many :song_entries
	has_many :musics, through: :song_entries
end