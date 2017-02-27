class Playlist < ActiveRecord::Base
	belongs_to :user
	has_many :music_playlists, {class_name: :MusicPlaylist}
	has_many :musics, through: :music_playlists
end