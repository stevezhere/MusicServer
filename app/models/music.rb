class Music < ActiveRecord::Base
	validates :title, presence: true, uniqueness: true
	validates :path, presence: true, uniqueness: true
end
