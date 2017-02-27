class Music < ActiveRecord::Base
	validates :title, presence: true, uniqueness: true
	validates :path, presence: true, uniqueness: true
	validate :title_exist_on_desktop
	has_many :music_playlists
	has_many :playlists, :through => :music_playlists

	def title_exist_on_desktop
		origin_path = File.join(Dir.home, "Desktop")
		Dir.chdir(origin_path)
		unless File.exist?(self.title)
			errors.add(self.title, 'cannot be found on Desktop')
		end
	end

	def move_file_storage(title)
		origin_path = File.join(Dir.home, "Desktop")
    destination_path = Rails.root.join 'public', 'music'
    Dir.chdir(origin_path)
    FileUtils.mv title, destination_path
	end

	def move_file_desktop(title)
		origin_path = File.join(Dir.home, "Desktop")
    destination_path = Rails.root.join 'public', 'music'
    Dir.chdir(destination_path)
    FileUtils.mv title, origin_path
	end

	def self.scan_desktop
		desktop = File.join(Dir.home, "Desktop")
    desktop_path = Pathname.new(desktop)
    desktop_path.children
	end
end