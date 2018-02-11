class Playlist < ActiveRecord::Base
	belongs_to :user, presence: true
	has_many :song_entries, :dependent => :destroy
	has_many :musics, through: :song_entries
	validates_presence_of :name
end