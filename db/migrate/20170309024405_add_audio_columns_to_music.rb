class AddAudioColumnsToMusic < ActiveRecord::Migration[5.0]
  def self.up
    change_table :musics do |t|
      t.has_attached_file :audio
    end
  end
end
