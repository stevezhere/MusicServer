class Music < ActiveRecord::Base
	validates :title, presence: true, uniqueness: true
	validates :path, presence: true, uniqueness: true
	validate :title_exist_on_desktop

	def title_exist_on_desktop
		origin_path = File.join(Dir.home, "Desktop")
		Dir.chdir(origin_path)
		unless File.exist?(self.title)
			errors.add(self.title, 'cannot be found on Desktop')
		end
	end

	def move_file(title)
		origin_path = File.join(Dir.home, "Desktop")
    destination_path = Rails.root.join 'public', 'music'
    Dir.chdir(origin_path)
    FileUtils.mv title, destination_path
	end

end