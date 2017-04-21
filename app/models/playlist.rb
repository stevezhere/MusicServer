class Playlist < ActiveRecord::Base
	belongs_to :user, # presence: true, gets rid of line 5 :user_id
	has_many :song_entries#, :dependent => :delete
	has_many :musics, through: :song_entries
	validates_presence_of :name, :user_id
end
