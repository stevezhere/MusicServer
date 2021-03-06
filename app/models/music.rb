class Music < ActiveRecord::Base
	has_many :song_entries, :dependent => :destroy
	has_many :playlists, :through => :song_entries
	scope :ordered, -> { includes(:song_entries).order('song_entries.created_at') }
	validates :title, presence: true, uniqueness: true
	# validate :title_exist_on_desktop
	has_attached_file :audio, { :url => "/:class/:id_partition/:filename" }
	validates_attachment_presence :audio
	validates_attachment_content_type :audio, :content_type => [ 'audio/mp3','audio/mpeg']

	# def title_exist_on_desktop
	# 	origin_path = File.join(Dir.home, "Desktop")
	# 	Dir.chdir(origin_path)
	# 	unless File.exist?(self.title)
	# 		errors.add(self.title, 'cannot be found on Desktop')
	# 	end
	# end

	def find_path_validation
		root_storage_path = Rails.root.join 'public', 'musics', '000', '000'
		latest_path = root_storage_path.children.sort.last
		if Dir.entries(latest_path).last == self.audio_file_name
			true
		else
			self.destroy
			false
		end
	end

	def self.all_except(musics)
		song_id = musics.map(&:id)
		where.not(id: song_id)
	end

	# def move_file_storage(title)
	# 	origin_path = File.join(Dir.home, "Desktop")
 #    destination_path = Rails.root.join 'public', 'music'
 #    Dir.chdir(origin_path)
 #    FileUtils.mv title, destination_path
	# end

	# def move_file_desktop(title)
	# 	origin_path = File.join(Dir.home, "Desktop")
 #    destination_path = Rails.root.join 'public', 'music'
 #    Dir.chdir(destination_path)
 #    FileUtils.mv title, origin_path
	# end

	# def self.scan_desktop
	# 	desktop = File.join(Dir.home, "Desktop")
 #    desktop_path = Pathname.new(desktop)
 #    desktop_path.children
	# end
end